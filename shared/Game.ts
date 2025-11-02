import { Ctx, DefaultPluginAPIs, Game as GameInterface, PlayerID} from "boardgame.io";
import { INVALID_MOVE, PlayerView } from "boardgame.io/core";
import { GAME_NAME, NO_CARD_SELECTED } from "./constants";
import { BoardMove, GameState, Location, PlayerGameState } from "../shared/types";
import { 
    getInitialDistrictsState, 
    getInitialPlayersState, 
    isPlayCardValid, 
    isWorkerPlacementValid 
} from "./game-helper";
import { LocationMovesEnum } from "./enums";
import { Card } from "../shared/services/types";
import { getMarketTierOneCards } from "../shared/services/cardServices";
import _ from "lodash";

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

export const getLoot = (player: PlayerGameState) => {
    player.loot = player.loot + 1;
}

export const discard = (player: PlayerGameState, cardIds: string[]): Card[] | string => {
    if (cardIds.length > player.hand.length || !cardIds.every(cid => player.hand.map(c => c.id).includes(cid)))
        return INVALID_MOVE;

    const discarded: Card[] = [];
    cardIds.forEach(cid => {
        discarded.push(player.hand.splice(player.hand.map(c => c.id).indexOf(cid), 1)[0]);
    });
    return discarded;
}

const rebuildDeck = (player: PlayerGameState, random: any): Card[] => {
    return random.Shuffle(player.discardPile);
}

export const locationMoves: {[key: string]: Function,} = {
    [LocationMovesEnum.DRAW]: (G: GameState, ctx: Ctx, random: any) => {
        draw(G.players[ctx.currentPlayer], random)
    },
    [LocationMovesEnum.ADD_PRESENCE_TOKEM]: (G: GameState, ctx: Ctx, random: any) => {
        draw(G.players[ctx.currentPlayer], random)
    },
    [LocationMovesEnum.GET_LOOT]: (G: GameState, ctx: Ctx, random: any) => {
        getLoot(G.players[ctx.currentPlayer])
    },
    [LocationMovesEnum.DISCARD]: (G: GameState, ctx: Ctx, random: any, params: any) => {
        discard(G.players[ctx.currentPlayer], params.indexes)
    }, 
}

export const executeMove = (move: BoardMove, state: any) => {
    locationMoves[move.moveId] ? locationMoves[move.moveId](state.G, state.ctx, state.random, move.params) : null;
}

export const checlInvalidMoves = (moves: BoardMove[], state: any) => {
    const clonedState = _.cloneDeep(state);
    for (let i = 0; i <= moves.length, i++;) {
        const clonedMove = _.cloneDeep(moves[i]);
        executeMove(clonedMove, clonedState)
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

                        if (currentLocation.cost?.moves && currentLocation.cost.moves.length > 0) {
                            checlInvalidMoves(currentLocation.cost.moves, state);
                        }

                        // play card
                        const playedCard = discard(playerState, [selectedCard.id]);
                        
                        playerState.discardPile.push(playedCard[0] as Card);
                        selectedCard.primaryEffects?.forEach(move => executeMove(move, state))
                    
                        // update resources
                        playerState.numberOfWorkers -= 1;
                        playerState.hasPlayedCard = true;
                        playerState.cardsInPlay?.push(selectedCard);
                        
                        currentLocation.cost.resources?.forEach(res => {
                            playerState[res.resourceId] -= res.amount;
                        })
                        currentLocation.reward.resources?.forEach(res => {
                            playerState[res.resourceId] += res.amount;
                        })
                        console.dir(selectedCard)
                        console.dir(currentLocation.reward.moves?.map(move => move.moveId).join(","))
                        currentLocation.reward.moves?.forEach(move => executeMove(move, state))

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