import { LocationCost, PlayerGameState, Location } from "../client/src/types";
import { isNullOrEmpty } from "./common-methods";
import { INITIAL_NUMBER_OF_WORKERS, NO_CARD_SELECTED } from "./constants";

export const getInitialPlayersState = (numberOfPlayers: number) => {
        let initialPlayersState: {[key: string]: PlayerGameState} = {};
        Array.from({ length: numberOfPlayers }).forEach((value: any, index: number) => {
            initialPlayersState[index.toString()] = {
            numberOfWorkers: INITIAL_NUMBER_OF_WORKERS,
            selectedCard: NO_CARD_SELECTED,
            hasPlayedCard: false
            }
        });
    
        return initialPlayersState;
    }

export const getInitialDistrictsState = () => {
    return [
        {
        name: "Conurba Complex",
        y: 67,
        x: 355,
        locations: [
        {
            index: 0,
            x: 54,
            y: 0,
            name: "La Salada",
            cost: {} as LocationCost,
            isSelected: false,
            isDisabled: false
        },
        {
            index: 1,
            x: 178,
            y: 0,
            cost: {} as LocationCost,
            name: "Gaseod. 7",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 2,
            x: 0,
            y: 67,
            cost: {} as LocationCost,
            name: "Docke",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 3,
            x: 124,
            y: 67,
            cost: {} as LocationCost,
            name: "Centro",
            isSelected: false,
            isDisabled: false
        },
        ],
        },
        {
        name: "EDOMEX",
        x: 613,
        y: 67,
        locations: [
        {
            index: 0,
            x: 54,
            y: 0,
            cost: {} as LocationCost,
            name: "edo_1",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 1,
            x: 178,
            y: 0,
            cost: {} as LocationCost,
            name: "edo_2",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 2,
            x: 0,
            y: 67,
            cost: {} as LocationCost,
            name: "edo_3",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 3,
            x: 124,
            y: 67,
            cost: {} as LocationCost,
            name: "edo_4",
            isSelected: false,
            isDisabled: false
        },
        ],
        },
        {
        name: "Kakkoii Atarashi Mall",
        x: 303,
        y: 344,
        locations: [
        {
            index: 0,
            x: 54,
            y: 0,
            cost: {} as LocationCost,
            name: "koii_1",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 1,
            x: 178,
            y: 0,
            cost: {} as LocationCost,
            name: "koii_2",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 2,
            x: 0,
            y: 67,
            cost: {} as LocationCost,
            name: "koii_3",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 3,
            x: 124,
            y: 67,
            cost: {} as LocationCost,
            name: "koii_4",
            isSelected: false,
            isDisabled: false
        },
        ],
        },
        {
        name: "#Xya_Xya_ZONE#",
        x: 665,
        y: 344,
        locations: [
        {
            index: 0,
            x: 54,
            y: 0,
            cost: {} as LocationCost,
            name: "xya_1",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 1,
            x: 178,
            y: 0,
            cost: {} as LocationCost,
            name: "xya_2",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 2,
            x: 0,
            y: 67,
            cost: {} as LocationCost,
            name: "xya_3",
            isSelected: false,
            isDisabled: false
        },
        {
            index: 3,
            x: 124,
            y: 67,
            cost: {} as LocationCost,
            name: "xia_4",
            isSelected: false,
            isDisabled: false
        },
        ],
        }
    ];
}


export const isPlayCardValid = (playerState: PlayerGameState, selectedCardIndex: number): boolean => {
    return !playerState.hasPlayedCard && selectedCardIndex !== NO_CARD_SELECTED;
}
    
export const isWorkerPlacementValid = (playerState: PlayerGameState, currentLocation: Location): boolean => {
    return !playerState.hasPlayedCard && playerState.numberOfWorkers > 0 && isNullOrEmpty(currentLocation.worker);
}