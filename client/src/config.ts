const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT ?? 4000);
const URL = import.meta.env.VITE_BACKEND_URL ?? `http://${window.location.hostname}:${SERVER_PORT}`;

export const BACKEND_URL = URL;