import { Card } from "./types";
import { DistrictIconsEnum } from "../enums";
import { getEnumStringKeys } from "../common-methods";
import _ from "lodash";

export const getInitialDeck = (): Card[] => {
    return [
        getSignetCard(),
        ...getTierOneCards(),
        ...getTierTwoCards(),
    ]
}

export const getTierOneCards = () => {
    return Object.values(DistrictIconsEnum).map<Card>(
        (districtId) => {
            return {
            ...getDistrictCard([districtId]),
            primaryEffects: ["addPresenceToken"]
            }
        }
    );
}

export const getTierTwoCards = (): Card[] => {

    return [
        {
            ...getDistrictCard([DistrictIconsEnum.D1, DistrictIconsEnum.D3]),
            secondaryEffects: ["addRepairToken"],
        },
        {
            ...getDistrictCard([DistrictIconsEnum.D2, DistrictIconsEnum.D4]),
            secondaryEffects: ["addRepairToken"],
        },
        ...getMiscelanousDeck()

    ];
}

export const getMarketTierOneCards = () => {
    const districtIds = getEnumStringKeys(DistrictIconsEnum);
    
    const tierOneMarketCards = _.flatMap(districtIds, id1 =>
        districtIds.map(id2 => [id1, id2])
        .filter(s => {
            const [a, b] = s;
            return a !== b; // elimina "LOC1-LOC1"
        }));

        const marketTierOne: Card[] = [];
        [...new Set(tierOneMarketCards)].forEach(tuple => {
            marketTierOne.push(getDistrictCard(tuple));
        })
    return marketTierOne;
}

const getMiscelanousDeck = (): Card[] => {
    return [
        {
            id: "MISC-1",
            name: "Strange Candy",
            districtIds: [],
            primaryEffects: ["getLoot"],
            secondaryEffects: ["strangeCandyPuzzle"]
        },
        {
            id: "MISC-2",
            name: "Cooldown",
            districtIds: [],
            secondaryEffects: ["coolDown"]
        },
        {
            id: "MISC-2",
            name: "Strange Candy",
            districtIds: [],
            primaryEffects: ["getLoot"],
            secondaryEffects: ["strangeCandyPuzzle"]
        }
    ];
}

export const getDistrictCard = (districtIds: string[]): Card => {
    const districtId = districtIds.join("-");

    return {
        id: districtId,
        districtIds,
        name: districtId,
    }
}

export const getSignetCard = () => ({
    id: "signet",
    name: "Signet",
    districtIds: [
        DistrictIconsEnum.D1,
        DistrictIconsEnum.D2,
        DistrictIconsEnum.D3,
        DistrictIconsEnum.D4,
    ],
    primaryEffect: ["signetTrigger"]
});

