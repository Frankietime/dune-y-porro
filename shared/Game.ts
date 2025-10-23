import { Game as GameInterface} from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { GAME_NAME, INITIAL_NUMBER_OF_WORKERS, NO_CARD_SELECTED } from "./constants";
import { GameState } from "./types";
import { LocationCost, Location } from "../client/src/types";
import { isNullOrEmpty } from "./common-methods";

const isWorkerPlacementValid = (G: GameState, currentLocation: Location): boolean => {
   return G.numberOfWorkers > 0 && isNullOrEmpty(currentLocation.worker);
}

export const Game: GameInterface<GameState> = {
    
    name: GAME_NAME,
    
    setup: () => ({
        
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

    phases: {
        workerPlacement: {
            start: true,
            turn: {
                onBegin: ({ G, ctx, events, random, ...plugins })=> {
                    G.numberOfWorkers = INITIAL_NUMBER_OF_WORKERS;
                    G.selectedCard = NO_CARD_SELECTED;
                },
                onEnd: ({ G, ctx, events, random, ...plugins }) => {
                    
                }
            },
            onBegin: (context) => {
            },
            onEnd: (context) => {
            },
        }
    },

    moves: {
        selectCard: (state, _, selectedCard ) => {
            state.G.selectedCard = selectedCard;
        },        
        placeWorker: (state, _, districtID, locationID) => {
            const currentLocation = state.G.districts[districtID].locations[locationID];

            if (!isWorkerPlacementValid(state.G, currentLocation))
                return INVALID_MOVE;
        
            // resources
            state.G.numberOfWorkers -= 1;
            state.G.selectedCard = -1;

            // district & location
            currentLocation.isDisabled = true;
            currentLocation.isSelected = true;
            currentLocation.worker = state.ctx.currentPlayer;
            
        
        },
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