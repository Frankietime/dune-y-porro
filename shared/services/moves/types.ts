import { BoardMove, MetaGameState, PlayerGameState } from "../../types";

export type MoveFunctionArgs = {
    mgState: MetaGameState, playerState: PlayerGameState, move: BoardMove,
}

export type MoveFunction = (args: MoveFunctionArgs) => void;
