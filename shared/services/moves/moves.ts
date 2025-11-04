import { INVALID_MOVE } from "boardgame.io/core";
import { Card, MetaGameState, PlayerGameState } from "../../types";
import { isPlayCardValid } from "../../game-helper";
import { getCurrentPlayer } from "./helper";

export const selectCard = (player: PlayerGameState, selectedCard: Card) => {
    if (!isPlayCardValid(player, selectedCard.id))
        return INVALID_MOVE;
    player.selectedCard = selectedCard;
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

export const discard = (player: PlayerGameState, cards: Card[]): Card[] | string => {
    let cardIds = cards.map(c => c.id);
    
    if (cardIds.length > player.hand.length || !cardIds.every(cid => player.hand.map(c => c.id).includes(cid)))
        return INVALID_MOVE;

    const discarded: Card[] = cardIds.map(cid => {
        return player.hand.splice(
            player.hand.map(c => c.id).indexOf(cid), 1
        )[0];
    });

    return player.discardPile = [...player.discardPile, ...discarded];
}

const rebuildDeck = (player: PlayerGameState, random: any): Card[] => {
    return random.Shuffle(player.discardPile);
}