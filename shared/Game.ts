import { Game as GameInterface} from "boardgame.io";
import { INVALID_MOVE, PlayerView } from "boardgame.io/core";
import { GAME_NAME, INITIAL_NUMBER_OF_WORKERS, NO_CARD_SELECTED } from "./constants";
import { GameState } from "./types";
import { LocationCost, Location, PlayerGameState } from "../client/src/types";
import { isNullOrEmpty } from "./common-methods";

const isPlayCardValid = (playerState: PlayerGameState, selectedCardIndex: number): boolean => {
    return !playerState.hasPlayedCard && selectedCardIndex !== NO_CARD_SELECTED;
}

const isWorkerPlacementValid = (playerState: PlayerGameState, currentLocation: Location): boolean => {
   return !playerState.hasPlayedCard && playerState.numberOfWorkers > 0 && isNullOrEmpty(currentLocation.worker);
}

const getInitialPlayersState = (numberOfPlayers: number) => {
    let initialPlayersState: {[key: string]: PlayerGameState} = {};
    Array.from({ length: numberOfPlayers }).forEach((value: any, index: number) => {
        initialPlayersState[index.toString()] = {
        numberOfWorkers: INITIAL_NUMBER_OF_WORKERS,
        selectedCard: NO_CARD_SELECTED,
        hasPlayedCard: false
        }
    });

    return initialPlayersState;
}

export const Game: GameInterface<GameState> = {
    
    name: GAME_NAME,

    minPlayers: 2,
    maxPlayers: 4,
    
    setup: ({ ctx, ...plugins }, setupData) => ({
        players: getInitialPlayersState(ctx.numPlayers),
        numberOfWorkers: INITIAL_NUMBER_OF_WORKERS,
        selectedCard: NO_CARD_SELECTED,
        districts: 
        [
            {
            name: "Conurba Complex",
            y: 67,
            x: 355,
            locations: [
            {
                index: 0,
                x: 54,
                y: 0,
                name: "La Salada",
                cost: {} as LocationCost,
                isSelected: false,
                isDisabled: false
            },
            {
                index: 1,
                x: 178,
                y: 0,
                cost: {} as LocationCost,
                name: "Gaseod. 7",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 2,
                x: 0,
                y: 67,
                cost: {} as LocationCost,
                name: "Docke",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 3,
                x: 124,
                y: 67,
                cost: {} as LocationCost,
                name: "Centro",
                isSelected: false,
                isDisabled: false
            },
            ],
            },
            {
            name: "EDOMEX",
            x: 613,
            y: 67,
            locations: [
            {
                index: 0,
                x: 54,
                y: 0,
                cost: {} as LocationCost,
                name: "edo_1",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 1,
                x: 178,
                y: 0,
                cost: {} as LocationCost,
                name: "edo_2",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 2,
                x: 0,
                y: 67,
                cost: {} as LocationCost,
                name: "edo_3",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 3,
                x: 124,
                y: 67,
                cost: {} as LocationCost,
                name: "edo_4",
                isSelected: false,
                isDisabled: false
            },
            ],
            },
            {
            name: "Kakkoii Atarashi Mall",
            x: 303,
            y: 344,
            locations: [
            {
                index: 0,
                x: 54,
                y: 0,
                cost: {} as LocationCost,
                name: "koii_1",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 1,
                x: 178,
                y: 0,
                cost: {} as LocationCost,
                name: "koii_2",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 2,
                x: 0,
                y: 67,
                cost: {} as LocationCost,
                name: "koii_3",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 3,
                x: 124,
                y: 67,
                cost: {} as LocationCost,
                name: "koii_4",
                isSelected: false,
                isDisabled: false
            },
            ],
            },
            {
            name: "#Xya_Xya_ZONE#",
            x: 665,
            y: 344,
            locations: [
            {
                index: 0,
                x: 54,
                y: 0,
                cost: {} as LocationCost,
                name: "xya_1",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 1,
                x: 178,
                y: 0,
                cost: {} as LocationCost,
                name: "xya_2",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 2,
                x: 0,
                y: 67,
                cost: {} as LocationCost,
                name: "xya_3",
                isSelected: false,
                isDisabled: false
            },
            {
                index: 3,
                x: 124,
                y: 67,
                cost: {} as LocationCost,
                name: "xia_4",
                isSelected: false,
                isDisabled: false
            },
            ],
            }
        ]
    }),

    playerView: PlayerView.STRIP_SECRETS,

    // players: {
    //     '1': { token: 'Player 1' },
    //     '2': { token: 'Player 2' },
    // },

    events: {
        // prevents player from ending a game
        endGame: false,
    },

    phases: {
        // worker placement, reveal,
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
            onBegin: (context) => {
            },
            onEnd: (context) => {
            },
        }
    },

    moves: {
        selectCard: {
            move: (state, _, selectedCard ) => {
                if (!isPlayCardValid(state.G.players[state.ctx.currentPlayer], selectedCard))
                    return INVALID_MOVE;
                state.G.players[state.ctx.currentPlayer].selectedCard = selectedCard;
            }, 
            undoable: true
        },        
        placeWorker: {
            move: (state, _, districtID, locationID) => {
                const currentLocation = state.G.districts[districtID].locations[locationID];

                const playerState = state.G.players[state.ctx.currentPlayer];

                if (!isWorkerPlacementValid(playerState, currentLocation))
                    return INVALID_MOVE;
            
                // resources
                playerState.numberOfWorkers -= 1;
                // playerState.selectedCard = -1;
                playerState.hasPlayedCard = true;

                // district & location
                currentLocation.isDisabled = true;
                currentLocation.isSelected = true;
                currentLocation.worker = state.ctx.currentPlayer;        
            },
            undoable: true
        }
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