
import _ from "lodash";
import { BoardMove, MetaGameState } from "../../types";
import { executeMove } from "./movesServices";

export const checlInvalidMoves = (mgState: MetaGameState ,moves: BoardMove[]) => {
    const clonedState = _.cloneDeep(mgState);
    for (let i = 0; i <= moves.length, i++;) {
        const clonedMove = _.cloneDeep(moves[i]);
        executeMove(clonedState, clonedMove)
    }
}