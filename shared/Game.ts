import { Ctx, DefaultPluginAPIs, Game as GameInterface, PlayerID} from "boardgame.io";
import { INVALID_MOVE, PlayerView } from "boardgame.io/core";
import { GAME_NAME, NO_CARD_SELECTED } from "./constants";
import { GameState, Location, PlayerGameState } from "../shared/types";
import { 
    getInitialDistrictsState, 
    getInitialPlayersState, 
    isPlayCardValid, 
    isWorkerPlacementValid 
} from "./game-helper";
import { LocationMovesEnum } from "./enums";
import { Card } from "../shared/services/types";
import { getInitialDeck, getMarketTierOneCards } from "../shared/services/cardServices";

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

export const draw = (player: PlayerGameState, random: any) => {
    if (player.hand.length == 0) {
        player.deck = rebuildDeck(player, random);

    } else {
        player.hand.push(player.deck.pop()!);                        
    }
}

const rebuildDeck = (player: PlayerGameState, random: any): Card[] => {
    return random.Shuffle(player.discardPile);
}

export const locationMoves: {[key: string]: Function,} = {
    [LocationMovesEnum.DRAW]: (G: GameState, ctx: Ctx, random: any) => {
        draw(G.players[ctx.currentPlayer], random)
    }
}

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
                    move: (args) => draw(args.G.players[args.ctx.currentPlayer], args.random),
                    undoable: false
                },
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

                        // play card
                        const playedCard = playerState.hand.splice(playerState.hand.indexOf(selectedCard), 1)[0];
                        playerState.discardPile.push(playedCard);
                    
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
                            locationMoves[move](state.G, state.ctx, state.random);
                        })

                        // update district & location
                        currentLocation.isDisabled = true;
                        currentLocation.isSelected = true;
                        currentLocation.takenByPlayerID = state.ctx.currentPlayer;   
                        
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