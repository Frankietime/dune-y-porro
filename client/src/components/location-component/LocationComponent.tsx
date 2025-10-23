import { District, Location } from "../../types";
import { useBoardComponent } from "../board-component/UseBoardComponent";
import "./LocationComponent.scss";

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
    isSelected
}: LocationComponentProps) => {

    const { ClickBox } = useBoardComponent();
    return (
        <ClickBox 
            _onClick={onClick}
            x={x + mirror} y={y} 
            show={true}>
            <div className="location-component-container">
                <div className="location-container" style={{backgroundColor: isSelected ? "RGB(75,0,130, 0.3)" : "none"}}>
                    {name}
                </div>
            </div>
        </ClickBox>
    );
}