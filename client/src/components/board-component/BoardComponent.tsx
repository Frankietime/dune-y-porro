import { useEffect, useRef, useState } from "react";
// import mapBg from "../../assets/board/prodis-tablero-mockup-v1.png";
import mapBg from "../../assets/board/prodis-tablero-estilo-v1.png";
import { useAppStore } from "../../store";
import { useBoardComponent } from "./UseBoardComponent";
import { useQuery } from "@tanstack/react-query";
import { useLobbyServices } from "../services/lobbyServices";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "../../../../shared/types";
import { LogEntry } from "boardgame.io";
import { Client } from "boardgame.io/client";
import { Game } from "../../../../shared/Game";
import { District, Location, LocationCost } from "../../types";
import { LocationComponent } from "../location-component/LocationComponent";

interface BoardGameProps extends BoardProps<GameState> {};

export const BoardComponent = ({ 
    ctx, 
    G, 
    moves, 
    events,
    log,
    matchID,
    playerID,
    credentials,
    sendChatMessage,
    chatMessages,
    
}: BoardGameProps) => {

  const chatRef = useRef<HTMLDivElement | null>(null);

  // 🧷 Auto-scroll "stickeado" al fondo (mientras no se suba manualmente)
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const handleScroll = () => {
      // si el usuario se va del fondo, no forzamos más el scroll
      const atBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < 10;
      el.dataset.stick = atBottom ? "true" : "false";
    };

    el.addEventListener("scroll", handleScroll);

    const observer = new ResizeObserver(() => {
      // solo scrollear si seguimos pegados abajo
      if (el.dataset.stick === "true") {
        el.scrollTop = el.scrollHeight;
      }
    });

    observer.observe(el);

    // inicializamos
    el.scrollTop = el.scrollHeight;
    el.dataset.stick = "true";

    return () => {
      el.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [chatMessages]);

  const [errorNotification, setErrorNotification] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [selectedCard, setSelectedCard] = useState(-1);
  const [districts, setDistricts] = useState<District[]>([
    {
      name: "Conurba Complex",
      y: 67,
      x: 355,
      locations: [
      {
        index: 0,
        x: 54,
        y: 0,
        name: "La Salada",
        cost: {} as LocationCost,
        isSelected: false,
        isDisabled: false
      },
      {
        index: 1,
        x: 178,
        y: 0,
        cost: {} as LocationCost,
        name: "Gaseod. 7",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 2,
        x: 0,
        y: 67,
        cost: {} as LocationCost,
        name: "Docke",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 3,
        x: 124,
        y: 67,
        cost: {} as LocationCost,
        name: "Centro",
        isSelected: false,
        isDisabled: false
      },
      ],
    },
    {
      name: "EDOMEX",
      x: 613,
      y: 67,
      locations: [
      {
        index: 0,
        x: 54,
        y: 0,
        cost: {} as LocationCost,
        name: "edo_1",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 1,
        x: 178,
        y: 0,
        cost: {} as LocationCost,
        name: "edo_2",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 2,
        x: 0,
        y: 67,
        cost: {} as LocationCost,
        name: "edo_3",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 3,
        x: 124,
        y: 67,
        cost: {} as LocationCost,
        name: "edo_4",
        isSelected: false,
        isDisabled: false
      },
      ],
    },
    {
      name: "Kakkoii Atarashi Mall",
      x: 303,
      y: 344,
      locations: [
      {
        index: 0,
        x: 54,
        y: 0,
        cost: {} as LocationCost,
        name: "koii_1",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 1,
        x: 178,
        y: 0,
        cost: {} as LocationCost,
        name: "koii_2",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 2,
        x: 0,
        y: 67,
        cost: {} as LocationCost,
        name: "koii_3",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 3,
        x: 124,
        y: 67,
        cost: {} as LocationCost,
        name: "koii_4",
        isSelected: false,
        isDisabled: false
      },
      ],
    },
    {
      name: "#Xya_Xya_ZONE#",
      x: 665,
      y: 344,
      locations: [
      {
        index: 0,
        x: 54,
        y: 0,
        cost: {} as LocationCost,
        name: "xya_1",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 1,
        x: 178,
        y: 0,
        cost: {} as LocationCost,
        name: "xya_2",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 2,
        x: 0,
        y: 67,
        cost: {} as LocationCost,
        name: "xya_3",
        isSelected: false,
        isDisabled: false
      },
      {
        index: 3,
        x: 124,
        y: 67,
        cost: {} as LocationCost,
        name: "xia_4",
        isSelected: false,
        isDisabled: false
      },
      ],
    }
  ]);
  
  const {
    getMatch,
    leaveMatch,
  } = useLobbyServices();

  const {
    playerProps,
    setPlayerProps,

    matchData,
    setMatchData
  } = useAppStore();

  const {
    Hud,
    Clickers,
    NumericTrackers,
    NumericTracker,
    VisualTracker,
    DynamicElement,
    ClickBox
  } = useBoardComponent();

  useQuery({
    queryKey: ["fetch-match-data"], 
    queryFn: () => getMatch(playerProps.matchID)    
      .then((match) => {
          setMatchData(match);

          return match;
      },
      (error) => {
        setErrorNotification(error)
      }
    ),
    enabled: playerProps != null && playerProps.matchID != ""}
  );

  const onLeaveMatch = async () => {
    leaveMatch(playerProps)
      .then(() => {
        setPlayerProps({ 
          ...playerProps, 
          matchID: "", 
          playerCredentials: ""
        });
    });
  };

  const onTurnEnd = (): void => {
    events.endTurn!();
  }

  const onSelectCard = (i: number) => {
    setSelectedCard(i);
  }

  const onLocationSelect = (districtIndex: number, locationIndex: number) => {
    const updatedDistricts = [
      ...districts.slice(0, districtIndex),

      {...districts[districtIndex], locations: districts[districtIndex].locations
        .map((l, i) => { l.isSelected = locationIndex == i; return l; })
      },
      
      ...districts.slice(districtIndex + 1 ) ]
 
    setDistricts([...updatedDistricts])
  } 


  const xPos = [54, 178, 0, 124];
  const yPos = [0, 0, 67, 67];

return (
  <div className='game-container'>
    {matchData != null && matchData.matchID && (
      <>

<div
  className="nes-container with-title is-dark font-nes"
  style={{
    position: "absolute",
    top: "0",
    left: "0",
    width: "310px",
    zIndex: 10,
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "12px",
    paddingLeft: "0px"

  }}
>
  <p className="title">Game | {matchData.setupData.name}</p>

  <div className="message-list">
    <div className="nes-text is-primary">
      <strong>Player Name:</strong> <p>{playerProps.name}</p>
    </div>

    <div className="nes-text is-primary">
      <strong>Players:</strong>
    </div>
    <ul className="nes-list is-circle" style={{ marginLeft: "1rem" }}>
      {matchData.players.map((p: any, index: number) => (
        <li
          key={index}
          className={ctx.currentPlayer == p.id ? "nes-text is-success" : "nes-text"}
        >
          {p.name}
        </li>
      ))}
    </ul>

    <div className="nes-text is-primary">
      <strong>ID:</strong> <p>{playerProps.playerID}</p>
    </div>
    <div className="nes-text is-primary">
      <strong>Match ID:</strong> <p>{playerProps.matchID}</p>
    </div>
    <div className="nes-text is-primary">
      <strong>Creds:</strong> <p>{playerProps.playerCredentials}</p>
    </div>

    {errorNotification && (
      <div className="nes-text is-error">{errorNotification}</div>
    )}
  </div>

  {/* CHAT */}
  <div  
    className=" with-title is-rounded is-dark"
    style={{
      marginTop: "1rem",
      margin: "10px",
      fontFamily: "'Press Start 2P', cursive",
      scrollBehavior: "smooth",
    }}
  >
    <p className="title">Chat</p>

    {/* Chat con alto fijo y scroll */}
    <div
      ref={chatRef}
      className="chat-log"
      style={{
        marginTop: "1rem",
        height: "300px",
        overflowY: "auto",
        paddingRight: "4px",
      }}
    >
      {chatMessages != null &&
        chatMessages.map((msj, index) => (
          <p
            key={index}
            className={"nes-balloon " + (msj.sender == playerProps.playerID ? "from-left" : "from-right")}
            style={{
              marginBottom: "1.5rem",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "10px",
              lineHeight: "1.4",
              color: "black",
              marginLeft: msj.sender == playerProps.playerID ? "0px" : "40px"
            }}
          >
            <span className="nes-text is-info">
              {matchData.players[msj.sender].name}:
            </span>{" "}
            {msj.payload}
          </p>
        ))}
    </div>
  </div>

  <div className="nes-field" style={{ marginBottom: ".75rem" }}>
      <input
        type="text"
        className="nes-input"
        placeholder="..."
        value={chatMessage}
        onChange={(evt) => setChatMessage(evt.target.value)}
        style={{ fontFamily: "'Press Start 2P', cursive" }}
        onKeyDown={(event) => { 
          if(event.code == "Enter") {
            sendChatMessage(chatMessage);
            setChatMessage(""); 
           }}}
      />
    </div>
    <button
      type="button"
      className="nes-btn is-primary"
      style={{ fontFamily: "'Press Start 2P', cursive" }}
      onClick={() => {
        sendChatMessage(chatMessage);
        setChatMessage("");
      }}
    >
      Enviar
    </button>

  <button
    onClick={onLeaveMatch}
    type="button"
    className="nes-btn is-error"
    style={{ marginTop: "1rem", fontFamily: "'Press Start 2P', cursive" }}
  >
    Leave
  </button>
</div>


        <div className="flex w-screen justify-around board">
          <div className="w-[1280px] h-[720px] relative border-1 box-content" style={{
            backgroundImage: `url(${mapBg})`,
          }}>
            <NumericTrackers x={277} y={88} /> {/* vertical trackers */}
            {/* <Clickers x={355} y={67} district={districts[0]} onLocationSelect={onLocationSelect}/> */}
           
              {districts.map((district, dIndex) => (
                 <div className="relative" style={{top: district.y, left: district.x, width: "fit-content", height: "fit-content"}}>
                  {district.locations.map((location, locIndex) => (
                    <LocationComponent
                      {...location}
                      key={dIndex + "-" + locIndex}
                      onClick={() => onLocationSelect(dIndex, locIndex)} 
                      x={xPos[locIndex]} y={yPos[locIndex]}
                      show={true}
                      district={district}
                      isDisabled={location.isDisabled || selectedCard != -1}
                      mirror={(dIndex == 1 || dIndex == 2) && locIndex > 1 ? 107 : 0}
                    />)
                  )}
                </div>
              ))}
            
            {/* side circular tracker */}
            {/* <NumericTracker x={345} y={209} w={54} h={54} show={true} />   */}
            {/* purple visual tracker */}
            {/* <VisualTracker x={400} y={210} show={true} />  */}
            {/* square numeric tracker combat */}
            {/* <NumericTracker x={575} y={190} w={80} h={75} show={true} /> */}
            {/* green dynamic elem */}  
            {/* <DynamicElement x={229} y={197} show={true} />   */}

            {/* <NumericTrackers x={989} y={88} />
            <Clickers x={613} y={67} mirror={true} />
            <NumericTracker x={912} y={209} w={54} h={54} show={true} />
            <VisualTracker x={735} y={210} show={true} />
            <NumericTracker x={657} y={190} w={80} h={75} show={true} />
            <DynamicElement x={1045} y={197} show={true} /> */}

            {/* <NumericTrackers x={277} y={279} />
            <Clickers x={303} y={344} mirror={true} />
            <NumericTracker x={345} y={270} w={54} h={54} show={true} />
            <VisualTracker x={400} y={270} show={true} />
            <NumericTracker x={575} y={270} w={80} h={75} show={true} />
            <DynamicElement x={281} y={463} show={true} /> */}

            {/* <NumericTrackers x={989} y={279} />
            <Clickers x={665} y={344} />
            <NumericTracker x={912} y={270} w={54} h={54} show={true} />
            <VisualTracker x={735} y={270} show={true} />
            <NumericTracker x={657} y={270} w={80} h={75} show={true} />
            <DynamicElement x={1045} y={385} show={true} /> */}
            
            <Hud 
              onPass={() => onTurnEnd()}
              onReveal={() => alert("Reveal!")}
              onSelectCard={(i) => onSelectCard(i)}
              onArrowUp={() => alert("arrow up")}
              onArrowDown={() => alert("arrow down")}

              selectedCardIndex={selectedCard}
            />
          </div>
        </div>
      </>  
    )}

    </div>

    
    
  );
}
