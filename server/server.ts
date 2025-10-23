// server.ts
import { Server, Origins } from 'boardgame.io/server';
import { Game } from '../shared/Game';
// 👇 Importá el CORS para Koa, no el de Express
import KoaCors from '@koa/cors';

const allowed = new Set([
  '*',
  'https://dyp.lucho.io',
]);

const server = Server({
  games: [Game],
  origins: [
    Origins.LOCALHOST,
    'https://dyp.lucho.io',
    '*'
  ],
});

// ✅ CORS para Koa
server.app.use(
  KoaCors({
    origin: (ctx) => {
      const origin = ctx.request.headers.origin ?? '*';
      return allowed.has(origin) ? origin : '*';
    },
    credentials: true,
    allowMethods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    exposeHeaders: ['Content-Length'],
  })
);

server.run({ port: 4000 });
