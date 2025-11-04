import { LocationMovesEnum } from "../../enums"
import { BoardMove, MetaGameState } from "../../types"
import { discard, draw, getLoot } from "./moves"
import { getCurrentPlayer } from "./helper"
import { MoveFunction, MoveFunctionArgs } from "./types"  

export const locationMoves: { [key: string]: MoveFunction } = {
    [LocationMovesEnum.DRAW]: ({ mgState, playerState, move }: MoveFunctionArgs) => {
        
        draw(playerState, mgState.random)
    },
    [LocationMovesEnum.ADD_PRESENCE_TOKEM]: ({ mgState, playerState, move }: MoveFunctionArgs) => {
        
        draw(playerState, mgState.random)
    },
    [LocationMovesEnum.GET_LOOT]: ({ mgState, playerState, move }: MoveFunctionArgs) => {

        getLoot(playerState)
    },
    [LocationMovesEnum.DISCARD]: ({ mgState, playerState, move }: MoveFunctionArgs) => {

        discard(playerState, move.params.indexes)
    }, 
}

export const executeMove = (mgState: MetaGameState, move: BoardMove) => {
    const playerState = getCurrentPlayer(mgState);
    locationMoves[move.moveId] ? locationMoves[move.moveId]({ mgState, playerState, move }) : null;
}