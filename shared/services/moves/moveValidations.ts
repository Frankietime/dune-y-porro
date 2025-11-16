
import _ from "lodash";
import { BoardMove, MetaGameState } from "../../types";
import { executeMove } from "./movesServices";

// Simulate a sequence of moves on a cloned state to detect obvious errors.
// Note: Current move implementations do not return status; this is a best-effort dry-run.
export const checlInvalidMoves = (mgState: MetaGameState, moves: BoardMove[]) => {
  const clonedState = _.cloneDeep(mgState);
  (moves ?? []).forEach((m) => {
    const clonedMove = _.cloneDeep(m);
    executeMove(clonedState, clonedMove);
  });
}
