import { District } from "../client/src/types";

export interface GameState {
    numberOfWorkers: number;
    districts: District[];
    selectedCard: number;
}