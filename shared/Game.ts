import { Ctx, DefaultPluginAPIs, Game as GameInterface, PlayerID} from "boardgame.io";
import { INVALID_MOVE, PlayerView } from "boardgame.io/core";
import { GAME_NAME, NO_CARD_SELECTED } from "./constants";
import { GameState } from "../shared/types";
import { 
    getInitialDistrictsState, 
    getInitialPlayersState, 
    isPlayCardValid, 
    isWorkerPlacementValid 
} from "./game-helper";

type State = {
    G: GameState;
    ctx: Ctx;
    playerID: PlayerID;
}

export const selectCard = (state: State, _: any, selectedCard: number) => {
    if (!isPlayCardValid(state.G.players[state.ctx.currentPlayer], selectedCard))
        return INVALID_MOVE;
    state.G.players[state.ctx.currentPlayer].selectedCard = selectedCard;
}

export const drawCard = () => {
    console.log("DRAW A CARD");
}

export const Game: GameInterface<GameState> = {
    
    name: GAME_NAME,

    minPlayers: 2,
    maxPlayers: 4,
    
    setup: ({ ctx, ...plugins }, setupData) => ({
        players: getInitialPlayersState(ctx.numPlayers),
        districts: getInitialDistrictsState()
    }),

    playerView: PlayerView.STRIP_SECRETS,

    phases: {
        // worker placement and reveal
        mainPhase: {
            start: true,
            turn: {                
                // play or reveal
                minMoves: 1,
                onBegin: ({ G, ctx, events, random, ...plugins })=> {
                    // reset player state
                    const playerState = G.players[ctx.currentPlayer];
                    playerState.hasPlayedCard = false;
                    playerState.selectedCard = NO_CARD_SELECTED;
                },
                onEnd: ({ G, ctx, events, random, ...plugins }) => {},                
                // end if no workers left, stage?
                endIf: () => (false)
            },
            moves: {
                selectCard: {
                    move: selectCard, 
                    undoable: true
                },        
                placeWorker: {
                    move: (state, _, districtID, locationID) => {
                        const currentLocation = state.G.districts[districtID].locations[locationID];
                        const playerState = state.G.players[state.ctx.currentPlayer];

                        if (!isWorkerPlacementValid(playerState, currentLocation))
                            return INVALID_MOVE;
                    
                        // update resources
                        playerState.numberOfWorkers -= 1;
                        playerState.hasPlayedCard = true;

                        // update district & location
                        currentLocation.isDisabled = true;
                        currentLocation.isSelected = true;
                        currentLocation.worker = state.ctx.currentPlayer;        
                    },
                    undoable: true
                }
            },
            onBegin: (context) => {
            },
            onEnd: (context) => {
            },
        }
    },

    events: {
        // prevents player from ending a game
        endGame: false,
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
    },
}