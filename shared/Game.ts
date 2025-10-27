import { Ctx, Game as GameInterface, PlayerID} from "boardgame.io";
import { INVALID_MOVE, PlayerView } from "boardgame.io/core";
import { GAME_NAME, NO_CARD_SELECTED } from "./constants";
import { Card, GameState, Location } from "../shared/types";
import { 
    getInitialDistrictsState, 
    getInitialPlayersState, 
    isPlayCardValid, 
    isWorkerPlacementValid 
} from "./game-helper";
import { LocationMovesEnum } from "./enums";

type State = {
    G: GameState;
    ctx: Ctx;
    playerID: PlayerID;
}

export const selectCard = (state: State, _: any, selectedCard: Card) => {
    if (!isPlayCardValid(state.G.players[state.ctx.currentPlayer], selectedCard.id))
        return INVALID_MOVE;
    state.G.players[state.ctx.currentPlayer].selectedCard = selectedCard;
}

export const locationMoves: {[key: string]: Function} = {
    [LocationMovesEnum.DRAW]: () => console.log("DRAW A CARD")
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
                    move: (state, _, districtID, locationID, selectedCard: Card) => {
                        const currentLocation: Location = state.G.districts[districtID].locations[locationID];
                        const playerState = state.G.players[state.ctx.currentPlayer];

                        if (!isWorkerPlacementValid(playerState, currentLocation, selectedCard))
                            return INVALID_MOVE;
                    
                        // update resources
                        playerState.numberOfWorkers -= 1;
                        playerState.hasPlayedCard = true;
                        playerState.cardsInPlay?.push(selectedCard);
                        
                        currentLocation.cost.resources.forEach(res => {
                            playerState[res.resourceId] -= res.amount;
                        })
                        currentLocation.reward.resources.forEach(res => {
                            playerState[res.resourceId] += res.amount;
                        })
                        currentLocation.reward.moves.forEach(move => {
                            locationMoves[move]();
                        })

                        // update district & location
                        currentLocation.isDisabled = true;
                        currentLocation.isSelected = true;
                        currentLocation.takenByPlayerID = state.ctx.currentPlayer;        
                    },
                    undoable: true
                },
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