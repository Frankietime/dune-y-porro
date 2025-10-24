import mapBg from "../../assets/board/prodis-tablero-estilo-y-char-v1.png";
import { useBoardComponent } from "./UseBoardComponent";
import { BoardProps } from "boardgame.io/react";
import { GameState } from "../../../../shared/types";
import { Location } from "../../types";
import { LocationComponent } from "../location-component/LocationComponent";
import { WorkerComponent } from "../worker-component/WorkerComponent";
import { GameInfoComponent } from "../game-info-component/GameInfoComponent";
import { isNullOrEmpty } from "../../../../shared/common-methods";

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

  const {
    Hud,
    NumericTrackers,
    NumericTracker,
    VisualTracker,
  } = useBoardComponent();  

  const onTurnEnd = (): void => {
    events.endTurn!();
  }

  const onSelectCard = (selectedCard: number) => {
    moves.selectCard(G, selectedCard)
  }

  const onLocationSelect = (districtIndex: number, locationIndex: number) => {
    moves.placeWorker(G, districtIndex, locationIndex);
  }

  const locsXPos = [54, 178, 0, 124];
  const locsYPos = [0, 0, 67, 67];

  const currentPlayerNumberOfWorkers = (): number => {
    return G.players[playerID!]?.numberOfWorkers;
  }

  const isLocationDisabled = (location: Location): boolean => {
    return location.isDisabled || G.players[ctx.currentPlayer]?.selectedCard == -1;
  }

  const getSelectedCard = (): number => {
    return G.players[ctx.currentPlayer]?.selectedCard;
  }

return (
  <div className='game-container'>
    {!isNullOrEmpty(matchID) && (
      <>
        <GameInfoComponent
          ctx={ctx}
          chatMessages={chatMessages}
          sendChatMessage={sendChatMessage}
        />

        {G.districts && (

          <div className="flex w-screen justify-around board">
            <div className="w-[1280px] h-[720px] relative border-1 box-content" 
              style={{backgroundImage: `url(${mapBg})`,}}
            >
              {G.districts.map((district, dIndex) => (
                <div 
                  key={dIndex} 
                  className="relative" 
                  style={{top: district.y, left: district.x, width: "fit-content", height: "fit-content"}}>
                  
                  {district.locations.map((location, locIndex) => (
                    <LocationComponent
                      {...location}
                      key={dIndex + "-" + locIndex}
                      x={locsXPos[locIndex]} y={locsYPos[locIndex]}
                      mirror={(dIndex == 1 || dIndex == 2) && locIndex > 1 ? 107 : 0}
                      show={true}
                      district={district}
                      onClick={() => onLocationSelect(dIndex, locIndex)} 
                      isDisabled={isLocationDisabled(location)}
                    />)
                  )}
                  
                </div>
              ))}
              
              {/* <NumericTracker x={345} y={209} w={54} h={54} show={true} />  
              <VisualTracker x={400} y={210} show={true} /> 
              <NumericTracker x={575} y={190} w={80} h={75} show={true} />
              <DynamicElement x={229} y={197} show={true} />  

              <NumericTrackers x={989} y={88} />
              <NumericTracker x={912} y={209} w={54} h={54} show={true} />
              <VisualTracker x={735} y={210} show={true} />
              <NumericTracker x={657} y={190} w={80} h={75} show={true} />
              <DynamicElement x={1045} y={197} show={true} /> */}

              <NumericTrackers x={277} y={279} />
              <NumericTracker x={345} y={270} w={54} h={54} show={true} />
              <VisualTracker x={400} y={270} show={true} />
              <NumericTracker x={575} y={270} w={80} h={75} show={true} />
              
              <WorkerComponent
                numerOfWorkers={currentPlayerNumberOfWorkers()}
                x={281} y={463}
                mirror={0}
              />

              {/* <NumericTrackers x={989} y={279} />
              <NumericTracker x={912} y={270} w={54} h={54} show={true} />
              <VisualTracker x={735} y={270} show={true} />
              <NumericTracker x={657} y={270} w={80} h={75} show={true} />
              <DynamicElement x={1045} y={385} show={true} /> */}
              
              <Hud 
                onPass={() => onTurnEnd()}
                onReveal={() => alert("Reveal!")}
                onArrowUp={() => alert("arrow up")}
                onArrowDown={() => alert("arrow down")}

                onSelectCard={(selectedCard) => onSelectCard(selectedCard)}
                selectedCardIndex={getSelectedCard()}
              />
            </div>
          </div>
        )}
      </>
    )}
  </div>    
  );
}
