import { isNullOrEmpty } from "../../../../shared/common-methods";
import { Dictionary, District, Location } from "../../../../shared/types";
import { useBoardComponent } from "../board-component/UseBoardComponent";
import "./LocationComponent.scss";

// workers
import redWorker from "../../assets/tipitos/tipito-rojo.png";
import greenWorker from "../../assets/tipitos/tipito-verde.png";
import violetWorker from "../../assets/tipitos/tipito-violeta.png";
import yellowWorker from "../../assets/tipitos/tipito-amarillo.png";
import { districtIconsDict, resourceIconsDict } from "./constants";
import { DistrictIconsEnum } from "../../../../shared/enums";

// location icons


export interface LocationComponentProps extends Location {
    x: number,
    y: number,
    district: District,
    show?: boolean,
    isSelected?: boolean;
    onClick: () => void,
    mirror: number,
}

export const LocationComponent = ({
    x, y,
    district,
    show = true,
    onClick,
    mirror,
    name,
    cost,
    reward,
    isSelected,
    isDisabled,
    worker
}: LocationComponentProps) => {

    const { ClickBox } = useBoardComponent();

    const l1 = "LOC1";
    return (
        <ClickBox 
            _onClick={onClick}
            disabled={isDisabled}
            x={x + mirror} y={y} 
            show={true}>
            <div className="location-component-container">
                
                <div className="location-container" style={{backgroundColor: isSelected ? "RGB(75,0,130, 0.3)" : "none"}}>
                    <div className="location-name-container col-span-3 row-span-1">{name}</div>
                    <div className="grid grid-flow-col grid-rows-1 grid-cols-3">
                        <div className="location-cost-container col-span-2">
                            <div className="grid grid-flow-col grid-rows-2 grid-cols-1">
                                <div className="location-icons-container">
                                    {cost.locationIconIds.map(lid => 
                                        <img 
                                            style={{height: "25px", width: "25px", display: "inline", }} 
                                            src={districtIconsDict[lid]}
                                        />
                                    )}
                                </div>
                                <div className="location-resource-cost-container">
                                    {cost.resources.map(r => 
                                        <img
                                            style={{height: "10px", width: "10px", display: "inline", margin: "3px"}} 
                                            src={resourceIconsDict[r.resourceId]} 
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="grid grid-flow-col grid-rows-2 grid-cols-1">
                                <div className="location-reward-container">
                                    {reward.resources.map(r => 
                                        <img
                                            style={{height: "10px", width: "10px", display: "inline", margin: "3px"}} 
                                            src={resourceIconsDict[r.resourceId]} 
                                        />
                                    )}
                                    <div className="">{reward.moves.map(m => <span>{m}</span>)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                {!isNullOrEmpty(worker) && (
                    <div className="worker-image-container">
                        <img src={redWorker}/>
                    </div>
                )}
                </div>
            </div>
        </ClickBox>
    );
}
