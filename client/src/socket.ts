import { io, Socket } from "socket.io-client";

const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT ?? 4000);
const URL = import.meta.env.VITE_BACKEND_URL ?? `http://${window.location.hostname}:${SERVER_PORT}`;

export const socket: Socket = io(URL, {
  transports: ["websocket"],
});