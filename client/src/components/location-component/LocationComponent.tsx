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
    takenByPlayerID
}: LocationComponentProps) => {

    const { ClickBox } = useBoardComponent();

    return (
        <ClickBox 
            _onClick={onClick}
            disabled={isDisabled}
            x={x + mirror} y={y} 
            show={true}>
            <div className="location-component-container">                
                <div className="location-container" style={{backgroundColor: isSelected ? "RGB(75,0,130, 0.3)" : "none"}}>
                    
                    {/* Name */}
                    <div className="location-name-container col-span-3 row-span-1">{name}</div>
                    
                    <div className="grid grid-flow-col grid-rows-1 grid-cols-3">
                        
                        {/* Cost */}
                        <div className="location-cost-container col-span-2">
                            <div className="grid grid-flow-col grid-rows-2 grid-cols-1">

                                {/* Location Icons Cost */}
                                <div className="location-icons-container">
                                    {cost.districtIconIds.map(did => 
                                        <DistrictIconComponent key={did} districtId={did} />
                                    )}
                                </div>
                                {/* Location Resources Cost */}
                                <div className="location-resource-cost-container">
                                    {cost.resources.map(resource => 
                                        Array.from({ length: resource.amount }).map((_, index) => (
                                            <ResourceComponent key={index} resourceId={resource.resourceId} />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Reward */}
                        <div className="col-span-3">
                            <div className="grid grid-flow-col grid-rows-2 grid-cols-1">

                                {/* Resources and Moves Reward */}
                                <div className="location-reward-container">
                                    {reward.resources.map(resource => 
                                        Array.from({ length: resource.amount }).map((_, index) => (
                                            <ResourceComponent key={index} resourceId={resource.resourceId} />
                                        ))
                                    )}
                                    <div className="">{reward.moves.map((m, index) => <span key={index}>{m}</span>)}</div>
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
