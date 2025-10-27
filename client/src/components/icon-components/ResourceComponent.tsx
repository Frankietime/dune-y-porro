import { resourceIconsDict } from "./constants";

export type ResourceComponentProps = {
    resourceId: string;
}

export const ResourceComponent = ({resourceId}: ResourceComponentProps ) => {
    return (
        <img
            style={{height: "10px", width: "10px", display: "inline", margin: "3px"}} 
            src={resourceIconsDict[resourceId]} 
        />
    )
}