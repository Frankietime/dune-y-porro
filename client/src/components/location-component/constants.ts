import LOC1 from "../../assets/board/LOC1-ICON-S.png";
import LOC2 from "../../assets/board/LOC2-ICON-S.png";
import LOC3 from "../../assets/board/LOC3-ICON-S.png";
import LOC4 from "../../assets/board/LOC4-ICON-S.png";

import CANDY from "../../assets/icon-placeholder/c-spice.png";
import LOOT from "../../assets/icon-placeholder/c-water.png";

import { Dictionary } from "../../../../shared/types";
import { DistrictIconsEnum, ResourceEnum } from "../../../../shared/enums";

export const districtIconsDict: Dictionary<any> = {
    [DistrictIconsEnum.D1]: LOC1,
    [DistrictIconsEnum.D2]: LOC2,
    [DistrictIconsEnum.D3]: LOC3,
    [DistrictIconsEnum.D4]: LOC4,
}

export const resourceIconsDict: Dictionary<any> = {
    [ResourceEnum.Candy]: CANDY,
    [ResourceEnum.Loot]: LOOT,
}