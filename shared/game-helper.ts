import { LocationCost, PlayerGameState, Location, District, Dictionary, ResourceCost, LocationReward } from "./types";
import { isNullOrEmpty } from "./common-methods";
import { INITIAL_NUMBER_OF_WORKERS, NO_CARD_SELECTED } from "./constants";
import { DistrictIconsEnum, ResourceEnum } from "./enums";

export const getInitialLocationsState = (districtName: string, districtId: string, names: string[]): Location[] => names.map<Location>((name, locIndex) => ({
    Id: districtName + "-" + locIndex.toString(),
    name,
    cost: getInitialLocationCost(districtId),      
    reward: getInitialLocationReward(),     
    isSelected: false,
    isDisabled: false
}));
export const getInitialLocationCost = (districtId: string): LocationCost => ({
        locationIconIds: [districtId],
        resources: [
            {
                amount: 1,
                resourceId: ResourceEnum.Candy.toString()
            },
            {
                amount: 1,
                resourceId: ResourceEnum.Loot.toString()
            }
        ]
});

export const getInitialLocationReward = (): LocationReward => ({
    resources: [
        {
            amount: 1,
            resourceId: ResourceEnum.Candy,
        }
    ],
    moves: ["draw"]
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
        locations: getInitialLocationsState("CONURBAPLEX", DistrictIconsEnum.D1.toString(), ["La Salada", "Gaseod. 7", "Docke", "Centro"]),
        },
        {
        name: "ECOPLEX",
        x: 613,
        y: 67,
        locations: getInitialLocationsState("", DistrictIconsEnum.D2.toString(), ["edo_1", "edo_2", "edo_3", "edo_4"]),
        },
        {
        name: "ATA Mall",
        x: 303,
        y: 344,
        locations: getInitialLocationsState("Conurba Complex",  DistrictIconsEnum.D3.toString(), ["koii_1", "koii_2", "koii_3", "koii_4"]),
        },
        {
        name: "#Xya_Xya_ZONE#",
        x: 665,
        y: 344,
        locations: getInitialLocationsState("Con",  DistrictIconsEnum.D4.toString(), ["xya_1", "xya_2", "xya_3", "xya_4"]),
        }
    ];
}


export const isPlayCardValid = (playerState: PlayerGameState, selectedCardId: number): boolean => {
    return !playerState.hasPlayedCard && selectedCardId !== NO_CARD_SELECTED;
}
    
export const isWorkerPlacementValid = (playerState: PlayerGameState, currentLocation: Location): boolean => {
    return !playerState.hasPlayedCard && playerState.numberOfWorkers > 0 && isNullOrEmpty(currentLocation.worker);
}