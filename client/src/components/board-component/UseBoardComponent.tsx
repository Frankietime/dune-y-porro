import { useAppStore } from "../../store";

export const useBoardComponent = () => {
    
    const Hud = (props: {
        onArrowUp?: () => void,
        onSelectCard?: (card: number) => void,
        onArrowDown?: () => void,
        onPass?: () => void,
        onReveal?: () => void,
    }) => {
    return <>
        <Card y={540} x={83} show={true} key="arrow-up" onClick={props.onArrowUp} />

        {Array.from(Array(5).keys()).map((_, i) => <Card 
            y={540} x={390 + i*105} show={true} key={`card-${i}`} 
            onClick={() => props.onSelectCard ? props.onSelectCard(i) : undefined} 
        />)}
        
        <Card y={540} x={1115} show={true} key="arrow-down" onClick={props.onArrowDown}  />

        <Button y={470} x={992} show={true} key="btn-pass" onClick={props.onPass} />
        <Button y={470} x={1110} show={true} key="btn-reveal" onClick={props.onReveal} />
        </>;
    };

    const Clickers = (props: {
    x?: number, y?: number,
    mirror?: boolean
    }) => {
    const bottomRowOffsetX = props.mirror ? 108 : 0;
    const offsetY = 0;
    const offsetX = 0;
    return <div className="relative" style={{top: props.y ?? 0, left: props.x ?? 0}}>
        <ClickBox x={54 + offsetX} y={0 + offsetY} show={true} />
        <ClickBox x={178 + offsetX} y={0 + offsetY} show={true} />
        <ClickBox x={0 + bottomRowOffsetX} y={67 + offsetY} show={true} />
        <ClickBox x={124 + bottomRowOffsetX} y={67 + offsetY} show={true} />
    </div>;
    }

    const DebugBox = (props: {log?: string}) => {
    return <div className="w-[calc(100%-1300px)] border-1 border-solid">
        <h2>Debug</h2>
        <code>{props.log ?? ""}</code>
    </div>;
    }

    const ClickBox = (props: {
    w?: number,
    h?: number,
    x: number,
    y: number,
    show?: boolean,
    }) => {
    return <EventBox {...props} w={props.w ?? 110} h={props.h ?? 55} />;
    }

    const NumericTrackers = (props: {
    x: number,
    y: number,
    }) => {
    return <div className="relative" style={{top: props.y, left: props.x}}>
        <NumericTracker x={0} y={0} show={true} />
        <NumericTracker x={4} y={50} h={38} w={38} show={true} />
        <NumericTracker x={4} y={49 + 1 * 38} h={38} w={38} show={true} />
        <NumericTracker x={4} y={49 + 2 * 38} h={38} w={38} show={true} />
    </div>;
    };

    const NumericTracker = (props: {
    w?: number,
    h?: number,
    x: number,
    y: number,
    show?: boolean,
    }) => {
    return <EventBox {...props} w={props.w ?? 45} h={props.h ?? 45} />;
    }

    const VisualTracker = (props: {
    w?: number,
    h?: number,
    x: number,
    y: number,
    show?: boolean,
    }) => {
    return <EventBox {...props} w={props.w ?? 175} h={props.h ?? 55} />;
    }

    const DynamicElement = (props: {
    w?: number,
    h?: number,
    x: number,
    y: number,
    show?: boolean,
    }) => {
    return <div className="relative" style={{top: props.y, left: props.x}}>
        <EventBox {...props} w={props.w ?? 20} h={props.h ?? 50} x={0} y={0} />
        <EventBox {...props} w={props.w ?? 20} h={props.h ?? 50} x={(props.w ?? 20) - 1} y={0} />
    </div>;
    }

    const Card = (props: {
    w?: number,
    h?: number,
    x: number,
    y: number,
    show?: boolean,
    onClick?: () => void,
    }) => {
    return <EventBox {...props} w={props.w ?? 105} h={props.h ?? 157} />;
    }

    const Button = (props: {
    w?: number,
    h?: number,
    x: number,
    y: number,
    show?: boolean,
    onClick?: () => void,
    }) => {
    return <EventBox {...props} w={props.w ?? 105} h={props.h ?? 48} />
    }

    const EventBox = (props: {
        w: number,
        h: number,
        x: number,
        y: number,
        show?: boolean,
        onClick?: () => void,
        }) => {
        return <div className={"event-box absolute" + (props.show ? " border-2 border-solid" : "")}
            style={{top: props.y, left: props.x, width: `${props.w}px`, height: `${props.h}px`}}
            onClick={props.onClick}
        />
    }

    return {
        Hud,
        Clickers,
        DebugBox,
        ClickBox,
        NumericTrackers,
        NumericTracker,
        VisualTracker,
        DynamicElement,
        Card,
        Button,
        EventBox
    }
}