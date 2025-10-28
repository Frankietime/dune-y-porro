import mapBg from "../../assets/board/prodis-tablero-estilo-y-char-v1.png";
import { useBoardComponent } from "./UseBoardComponent";
import { BoardProps } from "boardgame.io/react";
import {  GameState, PlayerGameState } from "../../../../shared/types";
import { Location } from "../../../../shared/types";
import { LocationComponent } from "../location-component/LocationComponent";
import { WorkerComponent } from "../icon-components/WorkerComponent";
import { GameInfoComponent } from "../game-info-component/GameInfoComponent";
import { isNullOrEmpty } from "../../../../shared/common-methods";
import { locsXPos, locsYPos } from "./constants";
import { useEffect, useMemo } from "react";
import { Card } from "../../../../shared/services/types";
import { wrap } from "lodash";

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
    Card
  } = useBoardComponent();  

  const player = useMemo<PlayerGameState>(() => {
    if(playerID != null) 
      return G.players[playerID] as PlayerGameState;    
    return {} as PlayerGameState;
  }, [G])
  
  const currentPlayer = useMemo(() => {
    const player = G.players[ctx.currentPlayer];
    return player;
  }, [G]);

  useEffect(() => {

  }, [G.players])

  const onTurnEnd = (): void => {
    events.endTurn!();
  }

  const onSelectCard = (selectedCard: Card) => {
    moves.selectCard(G, selectedCard)
  }

  const getRandomLocation = () => "LOC" + Math.round((Math.random() / 0.25));

  const onLocationSelect = (districtIndex: number, locationIndex: number) => {
    moves.placeWorker(G, districtIndex, locationIndex, G.players[ctx.currentPlayer]?.selectedCard);
  }

  const currentPlayerNumberOfWorkers = (): number => {
    return G.players[playerID!]?.numberOfWorkers;
  }

  const isLocationDisabled = (location: Location): boolean => {
    return location.isDisabled || !G.players[ctx.currentPlayer]?.selectedCard;
  }

  const getSelectedCard = (): Card | undefined => {
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
        >
          <div>Candy: {player.candy}</div>
          <div>Loot: {player.loot}</div>
          <div>VP: {player.victoryPoints}</div>
          <div>Deck: {player.deck.length}</div>
          <div>Discard: {player.discardPile.length}</div>
        </GameInfoComponent>

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
              
              {/* Player Area Component */}
              <WorkerComponent
                numerOfWorkers={currentPlayerNumberOfWorkers()}
                x={281} y={463}
                mirror={0}
                playerID={parseInt(playerID!)}
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

                // onSelectCard={(selectedCard) => onSelectCard(selectedCard)}
                // selectedCardIndex={getSelectedCard()}
              >
              <div style={{
                width: "200px"
              }}>
                {player.hand?.map((card: Card, index) => 
                  <Card
                      isSelected={card.id == getSelectedCard()?.id}
                      y={540} x={390 + index*105} show={true} key={`card-${card.id}-${index}`} 
                      onClick={() => onSelectCard(card)} 
                  >
                    <div style={{
                      fontSize: "9px",
                      overflowWrap: "break-word",
                      backgroundColor: "white"
                    }}>
                      <div>
                      {card?.name}
                    </div>
                    <hr></hr>
                    {card?.districtIds.length > 0 && 
                      <div>
                        Districts: {card.districtIds.join(",")}
                      </div>
                    }
                    <br></br>
                    {card.primaryEffects != null &&
                      <div>
                        Play: {card?.primaryEffects?.join(",")}
                      </div>
                    }
                    <br></br>

                    {card?.primaryEffects != null &&
                      <div>
                        Reveal: {card?.secondaryEffects?.join(",")}
                      </div>
                    }
                    </div>
                  </Card>
                )}  
              </div>
              </Hud>
            </div>
          </div>
        )}
      </>
    )}
  </div>    
  );
}
