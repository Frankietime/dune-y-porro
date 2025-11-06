import { INVALID_MOVE } from "boardgame.io/core";
import { Card, MetaGameState, PlayerGameState } from "../../types";
import { isNullOrEmpty } from "../../common-methods";

export const getCurrentPlayer = (mgState: MetaGameState) => {
    return mgState.G.players[mgState.ctx.currentPlayer];
}

export const getCurrentLocation = (mgState: MetaGameState, districtID: number, locationID: number) => {
    return mgState.G.districts[districtID].locations[locationID];
}

export const takeFromHand = (player: PlayerGameState, cards: Card[]): Card[] | string => {
    if (isNullOrEmpty(cards))
        return [];

    let cardIds = cards.map(c => c.id);
    
    if (cardIds.length > player.hand.length || !cardIds.every(cid => player.hand.map(c => c.id).includes(cid)))
        return INVALID_MOVE;

    const taken: Card[] = cardIds.map(cid => {
        return player.hand.splice(
            player.hand.map(c => c.id).indexOf(cid), 1
        )[0];
    });

    return taken;
}