import { useEffect, useState } from "react";
import mapBg from "../../assets/map-full.png";
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

  const [errorNotification, setErrorNotification] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [selectedCard, setSelectedCard] = useState(-1);
  const [districts, setDistricts] = useState<District[]>([{
    locations: [
      {
        index: 0,
        cost: {} as LocationCost,
        name: "location 1A",
        isSelected: false,
        isDisabled: false
      } as Location,
      {
        index: 1,
        cost: {} as LocationCost,
        name: "location 1A",
        isSelected: false,
        isDisabled: false
      } as Location,
      {
        index: 2,
        cost: {} as LocationCost,
        name: "location 1A",
        isSelected: false,
        isDisabled: false
      } as Location,
      {
        index: 3,
        cost: {} as LocationCost,
        name: "location 1A",
        isSelected: false,
        isDisabled: false
      } as Location,
    ]
  },])
  
  const client = Client({
    game: Game,
    matchID
  });
  
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

return (
  <div className='game-container'>
    {matchData != null && matchData.matchID && (
      <>
        <div className="absolute top-6 left-4 rounded-xl bg-black/60 px-6 py-4 text-base text-gray-100 shadow-lg backdrop-blur-sm">
          <h1 className="font-semibold text-lg">
            Game | {matchData.setupData.name}
          </h1>

          <div className="mt-2 space-y-1.5 leading-snug">
            <div>
              <span className="font-medium text-gray-200">Player Name:</span>{" "}
              <span className="text-gray-300">{playerProps.name}</span>
            </div>
             <div>
              <span className="font-medium text-gray-200">Players:</span>{" "}
              <span className="text-gray-300">
                {
                  matchData.players.map((p: any, index: number) => <p key={index} className={ctx.currentPlayer == p.id ? 'underline' : ''}>{p.name}</p> )
                }
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-200">ID:</span>{" "}
              <span className="text-gray-300">{playerProps.playerID}</span>
            </div>
            <div>
              <span className="font-medium text-gray-200">Match ID:</span>{" "}
              <span className="text-gray-300">{playerProps.matchID}</span>
            </div>
            <div>
              <span className="font-medium text-gray-200">Creds:</span>{" "}
              <span className="text-gray-300">{playerProps.playerCredentials}</span>
            </div>
            {errorNotification != "" && errorNotification != null && (
              <div>
                <span className="text-red-300">{errorNotification}</span>
              </div>
            )}
          </div>

          <div className="bg-black/40 mt-4 rounded-xl p-1">
            <div>Chat</div>
            <input className="bg-black/100 rounded-xl p-1" value={chatMessage} onChange={(evt) => setChatMessage(evt.target.value)}></input>
            <button className="bg-indigo-500 rounded-xl p-1" 
              onClick={() => { sendChatMessage(chatMessage); setChatMessage("")}}
            >Enviar</ button>
            
            {chatMessages != null && chatMessages.map((msj, index) => (
              <div>
                <span key={index} className="text-blue-300 nes-ballon">{playerProps.name + ": " + msj.payload}</span>
              </div>
            ))}
          </div>


          <button
            onClick={onLeaveMatch}
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Leave
          </button>
        </div>

        <div className="flex w-screen justify-around board">
          <div className="w-[1280px] h-[720px] relative border-1 box-content" style={{
            backgroundImage: `url(${mapBg})`,
          }}>
            <NumericTrackers x={277} y={88} /> {/* vertical trackers */}
            <Clickers x={355} y={67} district={districts[0]} onLocationSelect={onLocationSelect}/>
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
