import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { faker } from "@faker-js/faker";

/**
 * Servidor sencillo con autoridad de estado.
 * - Rooms múltiples
 * - Registro de jugadores
 * - Turnos en ronda
 * - "Jugadas" de demo (suma puntos)
 * - Eventos: joinRoom, makeMove, endTurn, sync
 */

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: true, credentials: true }
});

// Estado en memoria para prototipo
const rooms = new Map();
/*
roomState = {
  id: "abc",
  players: [{ id: socketId, name, score }],
  turnIndex: 0,
  startedAt: Date.now(),
  lastActionAt: Date.now()
}
*/

const getRoom = (roomId) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      players: [],
      turnIndex: 0,
      startedAt: Date.now(),
      lastActionAt: Date.now()
    });
  }
  return rooms.get(roomId);
};

const emitState = (roomId) => {
  const state = rooms.get(roomId);
  console.log("[emitState]", roomId, "players:", state.players.length, "turn:", state.turnIndex);
  if (state) io.to(roomId).emit("state", state);
};

const resourceAmountGenerator = () => {
  return Math.floor(Math.random() * 6);
}

io.on("connection", (socket) => {
  // Unirse a una sala
  socket.on("joinRoom", ({ roomId, playerName }) => {
    const room = getRoom(roomId);
    // si ya está, no dupliques
    if (!room.players.find((p) => p.id === socket.id)) {
      room.players.push({ 
        id: socket.id, 
        name: playerName || "Player",
        resources: [
          { type: "water", amount: resourceAmountGenerator() },
          { type: "spice", amount: resourceAmountGenerator() },
          { type: "solari", amount: resourceAmountGenerator() },
          { type: "persuasion", amount: resourceAmountGenerator() },
          { type: "power", amount: resourceAmountGenerator() }
        ],
        numberOfAgents: 2,
        score: 0
      });
    }
    socket.join(roomId);
    emitState(roomId);
  });

  // Jugada de ejemplo: suma 1 punto si es tu turno
  socket.on("makeMove", ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    const current = room.players[room.turnIndex];
    if (!current || current.id !== socket.id) return; // no es tu turno

    current.score += 1;
    room.lastActionAt = Date.now();
    emitState(roomId);
  });

  // Terminar turno
  socket.on("endTurn", ({ roomId }) => {
    console.log("endTurn")
    const room = rooms.get(roomId);
    if (!room) return;
    if (room.players.length === 0) return;

    // Solo el jugador actual puede pasar el turno
    const current = room.players[room.turnIndex];
    if (!current || current.id !== socket.id) return;

    room.turnIndex = (room.turnIndex + 1) % room.players.length;
    room.lastActionAt = Date.now();
    emitState(roomId);
  });

  // Sync manual (el cliente puede pedir estado)
  socket.on("sync", ({ roomId }) => {
    emitState(roomId);
  });

  // Limpia si se desconecta
  socket.on("disconnect", () => {
    // remueve de todas las rooms
    for (const [roomId, room] of rooms.entries()) {
      const idx = room.players.findIndex((p) => p.id === socket.id);
      if (idx !== -1) {
        room.players.splice(idx, 1);
        if (room.players.length === 0) {
          rooms.delete(roomId);
        } else {
          // ajusta turnIndex si hacía falta
          if (room.turnIndex >= room.players.length) {
            room.turnIndex = 0;
          }
          emitState(roomId);
        }
      }
    }
  });
});

const PORT = process.env.PORT || 4000;
// 0.0.0.0 para exponer en LAN
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server on http://0.0.0.0:${PORT}`);
});