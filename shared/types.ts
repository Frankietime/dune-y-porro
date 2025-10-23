import { District, PlayerGameState } from "../client/src/types";

export interface GameState {
    players: { [key: string]: PlayerGameState };
    districts: District[];
}