import { io, Socket } from "socket.io-client";

// Conecta al server en la misma LAN usando el hostname actual
const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT ?? 4000);
const URL = `http://${window.location.hostname}:${SERVER_PORT}`;

export const socket: Socket = io(URL, {
  transports: ["websocket"],
});