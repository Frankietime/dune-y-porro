import "./LocationComponent.scss";
import { isNullOrEmpty } from "../../../../shared/common-methods";
import { District, Location } from "../../../../shared/types";
import { useBoardComponent } from "../board-component/UseBoardComponent";
import { ResourceComponent } from "../icon-components/ResourceComponent";
import { DistrictIconComponent } from "../icon-components/DistrictIconComponent";
import { workerIconsByPlayerId } from "../icon-components/constants";

export interface LocationComponentProps extends Location {
    x: number,
    y: number,
    district: District,
    show?: boolean,
    isSelected?: boolean;
    onClick: () => void,
}

export const LocationComponent = ({
    x, y,
    district,
    show = true,
    onClick,
    name,
    cost,
    reward,
    isSelected,
    isDisabled,
    takenByPlayerID
}: LocationComponentProps) => {

    const { ClickBox } = useBoardComponent();

    return (
        <ClickBox 
            _onClick={onClick}
            disabled={isDisabled}
            x={x} y={y} 
            show={true}>
            <div className="location-component-container">                
                <div className="location-container" style={{backgroundColor: isSelected ? "RGB(75,0,130, 0.3)" : "none"}}>
                    
                    {/* Name */}
                    <div className="location-name-container">{name}</div>
                    
                    <div className="grid grid-flow-col grid-rows-1 grid-cols-2">
                        {/* Cost */}
                        <div className="location-cost-container col-span-1">
                            <div //className="grid grid-flow-col grid-rows-2 grid-cols-1">
                            >
                                {/* Location Icons Cost */}
                                <div className="location-icons-container">
                                    {cost.districtIconIds.map(did => 
                                        <DistrictIconComponent key={did} districtId={did} />
                                    )}
                                </div>
                                {/* Location Resources Cost */}
                                <div className="location-resource-cost-container">
                                    <div>{(!isNullOrEmpty(cost.resources) || !isNullOrEmpty(cost.moves)) && (<b>Cost</b>)}
                                    {cost.resources?.map(resource => 
                                        Array.from({ length: resource.amount }).map((_, index) => (
                                            // <ResourceComponent key={index} resourceId={resource.resourceId} />
                                            <div key={index}>{resource.resourceId}</div>
                                        ))
                                    )}
                                    {cost.moves?.map((move, index) => (
                                        // Array.from({ length: resource.amount }).map((_, index) => (
                                            // <ResourceComponent key={index} resourceId={resource.resourceId} />
                                            <div key={move + "-" + index}>{move}</div>
                                        ))
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reward */}
                        <div className="col-span-3">
                            <div style={{overflowWrap: "break-word"}} //className="grid grid-flow-col grid-rows-2 grid-cols-1">
                            >       
                                    {(!isNullOrEmpty(reward.resources) || !isNullOrEmpty(reward.moves)) && (<b>Reward</b>)}
                                {/* Resources and Moves Reward */}
                                <div className="">
                                    {reward.resources?.map(resource => 
                                        Array.from({ length: resource.amount }).map((_, index) => (
                                            // <ResourceComponent key={index} resourceId={resource.resourceId} />
                                            <div>{resource.resourceId}</div>
                                        ))
                                    )}
                                    <div className="">{reward.moves?.map((m, index) => <div key={index}>{m}</div>)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Worker Area */}
                    {!isNullOrEmpty(takenByPlayerID) && (
                        <div className="worker-image-container">
                            <img src={workerIconsByPlayerId[parseInt(takenByPlayerID!)]}/>
                        </div>
                    )}
                </div>
            </div>
        </ClickBox>
    );
}
