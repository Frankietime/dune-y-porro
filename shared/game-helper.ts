import { LocationCost, PlayerGameState, Location, District, Dictionary, LocationReward } from "./types";
import { getEnumStringKeys, isNullOrEmpty } from "./common-methods";
import { INITIAL_NUMBER_OF_WORKERS, NO_CARD_SELECTED } from "./constants";
import { DistrictIconsEnum, LocationMovesEnum, ResourceEnum } from "./enums";
import { Card } from "../shared/services/types";
import { getInitialDeck } from "../shared/services/cardServices";
import _ from "lodash";
import { DefaultPluginAPIs } from "boardgame.io";

export const getInitialLocationsState = (districtName: string, districtId: string, names: string[]): Location[] => names.map<Location>((name, locIndex) => ({
    Id: districtName + "-" + locIndex.toString(),
    name,
    cost: getInitialLocationCost(districtId),      
    reward: getInitialLocationReward(),     
    isSelected: false,
    isDisabled: false
}));

export const getInitialLocationCost = (districtId: string): LocationCost => ({
    districtIconIds: [districtId],
    resources: [
        {resourceId: ResourceEnum.Candy, amount: 1},
        {resourceId: ResourceEnum.Loot, amount: 1},
    ]
});

export const getInitialLocationReward = (): LocationReward => ({
    resources: [
        // {resourceId: ResourceEnum.Candy, amount: 1},
        // {resourceId: ResourceEnum.Loot, amount: 1},
    ],
    moves: [LocationMovesEnum.DRAW]
})


export const getInitialPlayersState = (numberOfPlayers: number, plugins: DefaultPluginAPIs): Dictionary<PlayerGameState> => {
    let initialPlayersState: {[key: string]: PlayerGameState} = {};

    let deck = plugins.random.Shuffle(getInitialDeck());
    console.dir(deck)
    let hand = deck.splice(0,4);

    Array.from({ length: numberOfPlayers }).forEach((value: any, Id: number) => {
            initialPlayersState[Id.toString()] = {
            numberOfWorkers: INITIAL_NUMBER_OF_WORKERS,
            selectedCard: NO_CARD_SELECTED,
            hasPlayedCard: false,
            [ResourceEnum.Candy]: 2,
            [ResourceEnum.Loot]: 2,
            victoryPoints: 0,
            deck: deck,
            hand: hand,
            discardPile: [],
            trashPile: [],
        }
    });

    return initialPlayersState;
}

export const getInitialDistrictsState = (): District[] => {
    return [
        {
        id: DistrictIconsEnum.D1,
        name: "CONURBAPLEX",
        y: 67,
        x: 355,
        locations: getInitialLocationsState("CONURBAPLEX", DistrictIconsEnum.D1, ["La Salada", "Gaseod. 7", "Docke", "Centro"]),
        },
        {
        id: DistrictIconsEnum.D2,
        name: "ECOPLEX",
        x: 613,
        y: 67,
        locations: getInitialLocationsState("", DistrictIconsEnum.D2, ["edo_1", "edo_2", "edo_3", "edo_4"]),
        },
        {
        id: DistrictIconsEnum.D3,
        name: "ATA Mall",
        x: 303,
        y: 344,
        locations: getInitialLocationsState("Conurba Complex",  DistrictIconsEnum.D3, ["koii_1", "koii_2", "koii_3", "koii_4"]),
        },
        {
        id: DistrictIconsEnum.D4,
        name: "#Xya_Xya_ZONE#",
        x: 665,
        y: 344,
        locations: getInitialLocationsState("Con",  DistrictIconsEnum.D4, ["xya_1", "xya_2", "xya_3", "xya_4"]),
        }
    ];
}

export const isPlayCardValid = (playerState: PlayerGameState, selectedCardId: string): boolean => {
    return !playerState.hasPlayedCard && selectedCardId !== NO_CARD_SELECTED;
}

export const isWorkerPlacementValid = (playerState: PlayerGameState, currentLocation: Location, cardInPlay: Card): boolean => {
    return (
        !playerState.hasPlayedCard && playerState.numberOfWorkers > 0 && 
        isNullOrEmpty(currentLocation.takenByPlayerID)
        && currentLocation.cost.districtIconIds.every(lid => cardInPlay!.districtIds.includes(lid))
        && currentLocation.cost.resources.every(resource => playerState[resource.resourceId] >= resource.amount)
    );
}