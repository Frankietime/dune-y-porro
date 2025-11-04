import { MetaGameState } from "../../types";

export const getCurrentPlayer = (mgState: MetaGameState) => {
    return mgState.G.players[mgState.ctx.currentPlayer];
}

export const getCurrentLocation = (mgState: MetaGameState, districtID: number, locationID: number) => {
    return mgState.G.districts[districtID].locations[locationID];
}