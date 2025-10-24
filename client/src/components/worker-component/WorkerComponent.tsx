import redWorker from "../../assets/tipitos/tipito-rojo.png";
import greenWorker from "../../assets/tipitos/tipito-verde.png";
import violetWorker from "../../assets/tipitos/tipito-violeta.png";
import yellowWorker from "../../assets/tipitos/tipito-amarillo.png";

export interface WorkerComponentProps {
    mirror: number,
    x: number,
    y: number,
    numerOfWorkers: number;
}

export const WorkerComponent = ({
    x,  
    y,
    mirror,
    numerOfWorkers = 0,
}: WorkerComponentProps) => {
    return (
        <div className="absolute" style={{top: y, left: x + mirror}}>            
            <div className="worker-component-container">
                {Array.from({length: numerOfWorkers}).map((_, index) => (
                    <div key={index} className="worker-image-container" style={{ left: index * 10, width: "40%", height: "40%" }}>
                        <img src={redWorker}/>
                    </div>
                ))}
            </div>
        </div>
    );
};