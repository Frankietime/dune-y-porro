import { DistrictIconsEnum, LocationMovesEnum, ResourceEnum } from "../enums";
import { District, Location, LocationReward } from "../types";


export const getInitialLocationReward = (): LocationReward => ({
    resources: [
        // {resourceId: ResourceEnum.Candy, amount: 1},
        // {resourceId: ResourceEnum.Loot, amount: 1},
    ],
    moves: [{ moveId: LocationMovesEnum.DRAW, name: "draw", params: [1]}]
});

export const getHighCouncil = (district: DistrictIconsEnum, locIndex: number): Location => ({
    Id: district.toString() + locIndex,
    name: "High Council",
    cost: {
        districtIconIds: [district],
        moves: [{ moveId: LocationMovesEnum.DISCARD, name: "discard 2", params: {cardIds: []}}]
    },
    reward: {
        moves: [
            {
                moveId: LocationMovesEnum.ADVANCE_TRACKER,
                name: "+Tracker"
            },
            {
                moveId: LocationMovesEnum.ADD_PRESENCE_TOKEM,
                name: "FIGHT!"
            }
        ],
    }
});

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
                    districtIconIds: [DistrictIconsEnum.D1],
                    moves: [{ moveId: LocationMovesEnum.TRASH, name: "trash"}]
                },
                reward: {
                    moves: [{moveId: LocationMovesEnum.BUY_CARD, name: "buy card"}]
                }
            },
            {...getHighCouncil(DistrictIconsEnum.D1, 2)},
            {
                Id: DistrictIconsEnum.D1.toString() + 3,
                name: "Time for Candy",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D1],
                    moves: [{ moveId: LocationMovesEnum.DISCARD, name: "discard 2", params: {indexes: []}}]
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
                    moves: [{moveId: LocationMovesEnum.TRASH, name: "trash"}, {moveId: LocationMovesEnum.BUY_CARD, name: "buy card"}]
                }
            },
            {
                Id: DistrictIconsEnum.D2 + 1,
                name: "Momentum",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D2],
                },
                reward: {
                    moves: [{ moveId: LocationMovesEnum.TRASH, name: "trash 2", params: {trashNumber: 2}}]
                }
            },
            {
                Id: DistrictIconsEnum.D2 + 2,
                name: "Restricted Area",
                cost: {
                    districtIconIds: [DistrictIconsEnum.D2],
                },
                reward: {
                    moves: [{ moveId: LocationMovesEnum.DEAL, name: "deal"}]
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
                        moves: [{ moveId: LocationMovesEnum.TRASH, name: "trash"}]
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
                    moves: [{moveId: LocationMovesEnum.DRAW, name: "draw"}, {moveId: LocationMovesEnum.DRAW, name: "draw"}, {moveId: LocationMovesEnum.DRAW, name: "draw"}]
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
                    moves: [{moveId: LocationMovesEnum.GET_SWORD_MASTER, name: "Sword Master"}]
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