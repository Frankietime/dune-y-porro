import { LocationCost, PlayerGameState, Location, District, Dictionary, LocationReward } from "./types";
import { isNullOrEmpty } from "./common-methods";
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

export const getHighCouncil = (district: DistrictIconsEnum, locIndex: number): Location => ({
    Id: district.toString() + locIndex,
    name: "High Council",
    cost: {
        districtIconIds: [district],
        moves: ["discardTwo"]
    },
    reward: {
        moves: ["advanceTracker", "addPresence"],
    }
})

export const getInitialDistrictsState = (): District[] => {
    return [
        {
            id: DistrictIconsEnum.D1,
            name: "CONURBAPLEX",
            y: 67,
            x: 355,
            locations: [
            {
                Id: DistrictIconsEnum.D1.toString() + 0,
                name: "Restricted Area",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D1],
                },
                reward: {moves: [], resources: []},
                dominanceBy: []
            },
            {
                Id: DistrictIconsEnum.D1 + 1,
                name: "CONURBA Market",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D2],
                    moves: ["trash"]
                },
                reward: {
                    moves: ["buyCard"]
                }
            },
            {...getHighCouncil(DistrictIconsEnum.D1, 2)},
            {
                Id: DistrictIconsEnum.D1.toString() + 3,
                name: "Time for Candy",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D1],
                    moves: ["discardTwo"]
                },
                reward: {
                    resources: [{resourceId: ResourceEnum.Candy, amount: 1}]
                }
            },
        ]
        },
        {
            id: DistrictIconsEnum.D2,
            name: "ECOPLEX - MARKET",
            x: 613,
            y: 67,
            locations: [
            {
                Id: DistrictIconsEnum.D2 + 0,
                name: "ECO Market",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D2],
                },
                reward: {
                    moves: ["trash", "buyCard"]
                }
            },
            {
                Id: DistrictIconsEnum.D2 + 1,
                name: "Momentum",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D2],
                },
                reward: {
                    moves: ["trashTwo"]
                }
            },
            {
                Id: DistrictIconsEnum.D2 + 2,
                name: "Restricted Area",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D2],
                },
                reward: {
                    moves: ["deal"]
                },
                dominanceBy: []
            },
            { ...getHighCouncil(DistrictIconsEnum.D2, 3) }
            ],
        },
        {
            id: DistrictIconsEnum.D3,
            name: "Streets",
            x: 303,
            y: 344,
            locations: [
                {
                    Id: DistrictIconsEnum.D3.toString() + 0,
                    name: "Easy Job",
                    cost: {
                        districtIconIds: [DistrictIconsEnum.D3],
                    },
                    reward: {
                        resources: [
                            {
                                resourceId: ResourceEnum.Loot,
                                amount: 1
                            }
                        ]
                    }
                },
                {
                    Id: DistrictIconsEnum.D3.toString() + 0,
                    name: "Bargain",
                    cost: {
                        districtIconIds: [DistrictIconsEnum.D3],
                        moves: ["trash"]
                    },
                    reward: {
                        resources: [
                            {
                                resourceId: ResourceEnum.Loot,
                                amount: 2
                            }
                        ]
                    }
                },
                {
                    Id: DistrictIconsEnum.D3.toString() + 0,
                    name: "Restricted Area",
                    cost: {
                        districtIconIds: [DistrictIconsEnum.D3],
                    },
                    reward: {
                        resources: []
                    }
                },
                { ...getHighCouncil(DistrictIconsEnum.D3, 3) }
            ],
        },
        {
        id: DistrictIconsEnum.D4,
        name: "AGI Control Zone",
        x: 665,
        y: 344,
        locations: [
            { ...getHighCouncil(DistrictIconsEnum.D4, 0) },
            {
                Id: DistrictIconsEnum.D4.toString() + 1,
                name: "Time is Gold",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D4],
                    resources: [
                        {
                            resourceId: ResourceEnum.Loot,
                            amount: 2
                        }
                    ],
                },
                reward: {
                    moves: ["draw", "draw", "draw"]
                }
            },
            {
                Id: DistrictIconsEnum.D4.toString() + 2,
                name: "Sword Master",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D4],
                    resources: [
                        {
                            resourceId: ResourceEnum.Candy,
                            amount: 4
                        }
                    ],
                },
                reward: {
                    moves: ["getSwordMaster"]
                }
            },
            {
                Id: DistrictIconsEnum.D4.toString() + 3,
                name: "Restricted Area",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D4],
                    resources: [],
                },
                reward: {}
            }
        ],
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
        && (
            currentLocation.cost.resources ? currentLocation.cost.resources.every(resource => playerState[resource.resourceId] >= resource.amount) : true)
    );
}