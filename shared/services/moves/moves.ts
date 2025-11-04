import { INVALID_MOVE } from "boardgame.io/core";
import { Card, MetaGameState, PlayerGameState } from "../../types";
import { isPlayCardValid } from "../../game-helper";
import { getCurrentPlayer, takeFromHand } from "./helper";

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
    
    const discarded = takeFromHand(player, cards);
    
    return discarded == INVALID_MOVE ? INVALID_MOVE : player.discardPile = [...player.discardPile, ...discarded as Card[]];
}

export const trash = (player: PlayerGameState, cards: Card[]): Card[] | string => {
    
    const trashed = takeFromHand(player, cards);
    
    return trashed == INVALID_MOVE ? INVALID_MOVE : player.trashPile = [...player.trashPile, ...trashed as Card[]];
}

const rebuildDeck = (player: PlayerGameState, random: any): Card[] => {
    return random.Shuffle(player.discardPile);
}