import { Game as GameInterface} from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { GAME_NAME } from "./constants";
import { GameState } from "./types";

export const Game: GameInterface<GameState> = {
    
    name: GAME_NAME,
    
    setup: () => ({
        
    }),

    moves: {
       
    },

    ai: {
        enumerate: (G, ctx) => {
            // let moves = [];
            // for (let i = 0; i < 9; i++) {
            //     if (G.cells[i] === null) {
            //         moves.push({ move: 'clickCell', args: [i] });
            //     }
            // }
            return [];
        },
    },

    endIf: (context) => {
        // if (IsVictory(G.cells)) {
        //     return { winner: ctx.currentPlayer };
        // }

        // if (IsDraw(G.cells)) {
        //     return { draw: true };
        // }
    },
}