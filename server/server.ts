import { Server, Origins } from 'boardgame.io/server';
import { Game } from '../shared/Game';

const server = Server({
  games: [Game],
  origins: [Origins.LOCALHOST, "https://dyp.lucho.io"],
});

server.run({port: 8000});