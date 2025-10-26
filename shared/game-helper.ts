import { LocationCost, PlayerGameState, Location, District, Dictionary, ResourceCost, LocationReward } from "./types";
import { isNullOrEmpty } from "./common-methods";
import { INITIAL_NUMBER_OF_WORKERS, NO_CARD_SELECTED } from "./constants";
import { LocationIconsEnum, ResourceEnum } from "./enums";
import { drawCard } from "./Game";

export const getInitialLocationsState = (districtName: string, names: string[]): Location[] => names.map<Location>((name, locIndex) => ({
    Id: districtName + "-" + locIndex.toString(),
    name,
    cost: getInitialLocationCost(),      
    reward: getInitialLocationReward(),     
    isSelected: false,
    isDisabled: false
}));

export const getInitialLocationCost = (): LocationCost => ({
    locationIconIds: Object.keys(LocationIconsEnum).map(k => k).filter(id => typeof id == "number"),
    resources: [
        {
            amount: 1,
            type: ResourceEnum.Candy
        },
        {
            amount: 1,
            type: ResourceEnum.Loot
        }
    ]
});

export const getInitialLocationReward = (): LocationReward => ({
    resources: [
        {
            amount: 1,
            type: ResourceEnum.Candy,
        }
    ],
    moves: []
})

export const getInitialPlayersState = (numberOfPlayers: number): Dictionary<PlayerGameState> => {
    let initialPlayersState: {[key: string]: PlayerGameState} = {};
    Array.from({ length: numberOfPlayers }).forEach((value: any, Id: number) => {
        initialPlayersState[Id.toString()] = {
        numberOfWorkers: INITIAL_NUMBER_OF_WORKERS,
        selectedCard: NO_CARD_SELECTED,
        hasPlayedCard: false
        }
    });

    return initialPlayersState;
}

export const getInitialDistrictsState = (): District[] => {
    return [
        {
        name: "CONURBAPLEX",
        y: 67,
        x: 355,
        locations: getInitialLocationsState("CONURBAPLEX", ["La Salada", "Gaseod. 7", "Docke", "Centro"]),
        },
        {
        name: "ECOPLEX",
        x: 613,
        y: 67,
        locations: getInitialLocationsState("", ["edo_1", "edo_2", "edo_3", "edo_4"]),
        },
        {
        name: "ATA Mall",
        x: 303,
        y: 344,
        locations: getInitialLocationsState("Conurba Complex", ["koii_1", "koii_2", "koii_3", "koii_4"]),
        },
        {
        name: "#Xya_Xya_ZONE#",
        x: 665,
        y: 344,
        locations: getInitialLocationsState("Con", ["xya_1", "xya_2", "xya_3", "xya_4"]),
        }
    ];
}


export const isPlayCardValid = (playerState: PlayerGameState, selectedCardId: number): boolean => {
    return !playerState.hasPlayedCard && selectedCardId !== NO_CARD_SELECTED;
}
    
export const isWorkerPlacementValid = (playerState: PlayerGameState, currentLocation: Location): boolean => {
    return !playerState.hasPlayedCard && playerState.numberOfWorkers > 0 && isNullOrEmpty(currentLocation.worker);
}