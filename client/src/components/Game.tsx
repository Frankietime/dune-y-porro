import { useState } from "react";
import mapBg from "../assets/map-full.png";

export const Game = (props: { gameId: string }) => {
  const [log, setLog] = useState(`Game: ${props.gameId}`);

  return <div className="flex w-screen justify-around">
    <DebugBox log={log} />
    <div className="w-[1280px] h-[720px] relative border-1 box-content" style={{
      backgroundImage: `url(${mapBg})`,
    }}>
      <NumericTrackers x={277} y={88} /> {/* vertical trackers */}
      <Clickers x={355} y={67} /> {/* red clickers */}
      <NumericTracker x={345} y={209} w={54} h={54} show={true} />  {/* side circular tracker */}
      <VisualTracker x={400} y={210} show={true} /> {/* purple visual tracker */}
      <NumericTracker x={575} y={190} w={80} h={75} show={true} />  {/* square numeric tracker combat */}
      <DynamicElement x={229} y={197} show={true} />  {/* green dynamic elem */}

      <NumericTrackers x={989} y={88} />
      <Clickers x={613} y={67} mirror={true} />
      <NumericTracker x={912} y={209} w={54} h={54} show={true} />
      <VisualTracker x={735} y={210} show={true} />
      <NumericTracker x={657} y={190} w={80} h={75} show={true} />
      <DynamicElement x={1045} y={197} show={true} />

      <NumericTrackers x={277} y={279} />
      <Clickers x={303} y={344} mirror={true} />
      <NumericTracker x={345} y={270} w={54} h={54} show={true} />
      <VisualTracker x={400} y={270} show={true} />
      <NumericTracker x={575} y={270} w={80} h={75} show={true} />
      <DynamicElement x={281} y={463} show={true} />

      <NumericTrackers x={989} y={279} />
      <Clickers x={665} y={344} />
      <NumericTracker x={912} y={270} w={54} h={54} show={true} />
      <VisualTracker x={735} y={270} show={true} />
      <NumericTracker x={657} y={270} w={80} h={75} show={true} />
      <DynamicElement x={1045} y={385} show={true} />
      
      <Hud 
        onPass={() => alert("Pass!")}
        onReveal={() => alert("Reveal!")}
        onSelectCard={(i) => alert(`Selected card ${i}`)}
        onArrowUp={() => alert("arrow up")}
        onArrowDown={() => alert("arrow down")}
      />
    </div>
  </div>;
}

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
