import { resourceIconsDict } from "./constants";

export type ResourceComponentProps = {
    resourceId: string;
    amount?: number;
}

export const ResourceComponent = ({ resourceId, amount }: ResourceComponentProps ) => {
    return (
        <>
            <img
                style={{height: "5%", width: "30%", display: "inline"}} 
                src={resourceIconsDict[resourceId]} 
            />
            { amount && <div style={{display: "inline"}}> x {amount} </div> }
        </>
    )
}