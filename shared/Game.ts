import { Ctx, DefaultPluginAPIs, Game as GameInterface, PlayerID} from "boardgame.io";
import { INVALID_MOVE, PlayerView } from "boardgame.io/core";
import { GAME_NAME, NO_CARD_SELECTED } from "./constants";
import { BoardMove, GameState, Location, MetaGameState, PlayerGameState } from "../shared/types";
import { 
    getInitialPlayersState, 
    isPlayCardValid, 
    isWorkerPlacementValid 
} from "./game-helper";
import { LocationMovesEnum } from "./enums";
import { Card } from "../shared/types";
import { getMarketTierOneCards } from "../shared/services/cardServices";
import _, { get } from "lodash";

import { getInitialDistrictsState } from "./services/locationServices";
import { discard, draw, getLoot, selectCard } from "./services/moves/moves";
import { checlInvalidMoves } from "./services/moves/moveValidations";
import { executeMove } from "./services/moves/movesServices";
import { getCurrentLocation, getCurrentPlayer } from "./services/moves/helper";

export const Game: GameInterface<GameState> = {
    
    name: GAME_NAME,

    minPlayers: 2,
    maxPlayers: 4,
    
    setup: ({ ctx, ...plugins }, setupData) => ({
        players: getInitialPlayersState(ctx.numPlayers, plugins),
        districts: getInitialDistrictsState(),
        cardMarket: plugins.random.Shuffle([
            ...getMarketTierOneCards(),
        ])
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
                draw: {
                    move: (mgState: MetaGameState) => draw(getCurrentPlayer(mgState), mgState.random),
                    undoable: false
                },
                selectCard: {
                    move: (
                        mgState: MetaGameState, 
                        gameState: GameState, 
                        selectedCard: Card
                    ) => selectCard(getCurrentPlayer(mgState), selectedCard), 
                    undoable: true
                },    
                placeWorker: {
                    move: (
                        mgState: MetaGameState, 
                        gameState: GameState, 
                        districtID: number, 
                        locationID: number, 
                        selectedCard: Card, 
                        moveParams: any
                    ) => {
                        
                        const currentLocation: Location = getCurrentLocation(mgState, districtID, locationID);
                        const playerState = getCurrentPlayer(mgState);

                        if (!isWorkerPlacementValid(playerState, currentLocation, selectedCard))
                            return INVALID_MOVE;

                        if (currentLocation.cost?.moves && currentLocation.cost.moves.length > 0) {
                            checlInvalidMoves(mgState, currentLocation.cost.moves);
                        }

                        // play card
                        const playedCard = discard(playerState, [selectedCard]);
                        
                        playerState.discardPile.push(playedCard[0] as Card);
                        
                        if (selectedCard.primaryEffects)
                            executeMove(mgState, selectedCard.primaryEffects!);
                    
                        // update resources
                        playerState.numberOfWorkers -= 1;
                        playerState.hasPlayedCard = true;
                        playerState.cardsInPlay?.push(selectedCard);
                        
                        currentLocation.cost.resources?.forEach(res => {
                            playerState[res.resourceId] -= res.amount;
                        })

                        currentLocation.cost.moves?.map(m => {
                            discard(playerState, moveParams);
                        });

                        currentLocation.reward.resources?.forEach(res => {
                            playerState[res.resourceId] += res.amount;
                        });

                        currentLocation.reward.moves?.forEach(move => executeMove(mgState, move))

                        // update district & location
                        currentLocation.isDisabled = true;
                        currentLocation.isSelected = true;
                        currentLocation.takenByPlayerID = mgState.ctx.currentPlayer;   
                        
                        // update decks
                    },
                    undoable: true
                },
            },
            onBegin: (context) => {
                // draw
                Object.keys(context.G.players).forEach(playerId => {
                    draw(context.G.players[playerId], context.random);
                })
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