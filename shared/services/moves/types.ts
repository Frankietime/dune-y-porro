import { BoardMove, Location, MetaGameState, PlayerGameState } from "../../types";

export type MoveFunctionArgs = {
    mgState: MetaGameState, 
    playerState: PlayerGameState, 
    move: BoardMove,
    location?: Location
}

export type MoveFunction = (args: MoveFunctionArgs) => void;
