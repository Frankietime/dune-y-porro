import redWorker from "../../assets/tipitos/tipito-rojo.png";
import greenWorker from "../../assets/tipitos/tipito-verde.png";
import violetWorker from "../../assets/tipitos/tipito-violeta.png";
import yellowWorker from "../../assets/tipitos/tipito-amarillo.png";
import { useBoardComponent } from "../board-component/UseBoardComponent";

export interface WorkerComponentProps {
    show?: boolean,
    isSelected?: boolean;
    onClick: () => void,
    mirror: number,
    x: number,
    y: number,
    name: string,
    isDisabled: boolean,
    numerOfWorkers: number;
}

const { ClickBox } = useBoardComponent();

export const WorkerComponent = ({
    show = true,
    onClick,
    x,  
    y,
    mirror,
    name,
    isDisabled,
    numerOfWorkers = 0,
}: WorkerComponentProps) => {
    return (
        <ClickBox 
            _onClick={onClick}
            disabled={isDisabled}
            x={x + mirror} y={y} 
            show={true}>
            
            <div className="worker-component-container">
                {Array.from({length: numerOfWorkers}).map((_, index) => (
                    <div key={index} className="worker-image-container" style={{ left: index * 10 }}>
                        <img src={redWorker}/>
                    </div>
                ))}
            </div>
        </ClickBox>
    );
};