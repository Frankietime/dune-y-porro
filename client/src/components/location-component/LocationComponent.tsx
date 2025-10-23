import { isNullOrEmpty } from "../../../../shared/common-methods";
import { District, Location } from "../../types";
import { useBoardComponent } from "../board-component/UseBoardComponent";
import "./LocationComponent.scss";
import redWorker from "../../assets/tipitos/tipito-rojo.png";
import greenWorker from "../../assets/tipitos/tipito-verde.png";
import violetWorker from "../../assets/tipitos/tipito-violeta.png";
import yellowWorker from "../../assets/tipitos/tipito-amarillo.png";

export interface LocationComponentProps extends Location {
    district: District,
    show?: boolean,
    isSelected?: boolean;
    onClick: () => void,
    mirror: number,
}

export const LocationComponent = ({
    district,
    show = true,
    onClick,
    x,
    y,
    mirror,
    name,
    isSelected,
    isDisabled,
    worker
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
                    {name}
                </div>
                {!isNullOrEmpty(worker) && (
                    <div className="worker-image-container">
                        <img src={redWorker}/>
                    </div>
                )}
            </div>
        </ClickBox>
    );
}
