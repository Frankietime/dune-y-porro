import { districtIconsDict } from "./constants";

export type DistrictIconComponentProps = {
    districtId: string;
}

export const DistrictIconComponent = ({ districtId }: DistrictIconComponentProps) => {
    return (
        <img 
            style={{height: "25px", width: "25px", display: "inline", }} 
            src={districtIconsDict[districtId]}
        />
    )
}