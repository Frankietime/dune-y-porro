import D1 from "../../assets/board/LOC1-ICON-S.png";
import D2 from "../../assets/board/LOC2-ICON-S.png";
import D3 from "../../assets/board/LOC3-ICON-S.png";
import D4 from "../../assets/board/LOC4-ICON-S.png";

import CANDY from "../../assets/icon-placeholder/c-spice.png";
import LOOT from "../../assets/icon-placeholder/c-water.png";

import redWorker from "../../assets/tipitos/tipito-rojo.png";
import greenWorker from "../../assets/tipitos/tipito-verde.png";
import violetWorker from "../../assets/tipitos/tipito-violeta.png";
import yellowWorker from "../../assets/tipitos/tipito-amarillo.png";

import { Dictionary } from "../../../../shared/types";
import { DistrictIconsEnum, ResourceEnum } from "../../../../shared/enums";

export const districtIconsDict: Dictionary<any> = {
    [DistrictIconsEnum.D1]: D1,
    [DistrictIconsEnum.D2]: D2,
    [DistrictIconsEnum.D3]: D3,
    [DistrictIconsEnum.D4]: D4,
}

export const resourceIconsDict: Dictionary<any> = {
    [ResourceEnum.Candy]: CANDY,
    [ResourceEnum.Loot]: LOOT,
}

export const workerIconsByPlayerId = [redWorker, greenWorker, violetWorker, yellowWorker];
