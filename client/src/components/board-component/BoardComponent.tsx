import mapBg from "../../assets/board/prodis-tablero-estilo-y-char-v1.png";
import { useBoardComponent } from "./UseBoardComponent";
import { BoardProps } from "boardgame.io/react";
import {  GameState, PlayerGameState } from "../../../../shared/types";
import { Location } from "../../../../shared/types";
import { LocationComponent } from "../location-component/LocationComponent";
import { WorkerComponent } from "../icon-components/WorkerComponent";
import { GameInfoComponent } from "../game-info-component/GameInfoComponent";
import { isNullOrEmpty } from "../../../../shared/common-methods";
import { locsXPos, locsYPos, trackerXPos, trackerYPos } from "./constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../../../../shared/types";
import "./BoardComponent.scss";
import { DistrictIconComponent } from "../icon-components/DistrictIconComponent";
import { LocationMovesEnum, PlayerColorsEnum } from "../../../../shared/enums";
import { CardComponent } from "../card-components/CardComponent";
import _ from "lodash";
import { Button, Dialog, Flex, Table, Text, TextField, Tooltip } from "@radix-ui/themes";
import { useAppStore } from "../../store";
import { CardSelectionModalOptions } from "./types";
import { PlayerAreaComponent } from "../player-area-component/PlayerAreaComponent";

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
    Hud
  } = useBoardComponent();  

  useEffect(() => {
    // reset UI non-cient state at the begining of the round
    if (ctx.phase == "mainPhase")
      setRoundIsEnding(false);
    
  }, [ctx.phase])

  const { matchData } = useAppStore();

  const initialCardSelectionModalOptions = {
    actionName: "",
    isOpen: false,
    isRequired: true,
    cardOptions: [],
    callback: () => {},
    selectionLimit: 0
  }
  const [cardSelectionModalOptions, setCardSelectionModalOptions] = useState<CardSelectionModalOptions>({...initialCardSelectionModalOptions});

  const player = useMemo<PlayerGameState>(() => {
    if(playerID != null) 
      return G.players[playerID] as PlayerGameState;    
    return {} as PlayerGameState;
  }, [G]);

  const onSelectToDiscard = (selectedCard: Card, limit: number) => {

    let _cardSelection: Card[] = [];
    
    const selectedCardIds = cardSelectionModalOptions.cardsSelected?.map(c => c.id) ?? [];

    if (selectedCardIds && selectedCardIds.includes(selectedCard.id)) {
      _cardSelection = [];
    } else if (selectedCardIds.length < limit) {
        _cardSelection = [...(cardSelectionModalOptions.cardsSelected ?? []), selectedCard];
    } else {
      _cardSelection = cardSelectionModalOptions.cardsSelected ?? []; 
    }

    setCardSelectionModalOptions({
      ...cardSelectionModalOptions,
      cardsSelected: Array.from(new Set(_cardSelection))
    });
  }

  const confirmCardSelection = () => {
    if (cardSelectionModalOptions.cardsSelected && cardSelectionModalOptions.cardsSelected.length == cardSelectionModalOptions.selectionLimit) {
      cardSelectionModalOptions.callback(cardSelectionModalOptions.cardsSelected!);
      setCardSelectionModalOptions({...initialCardSelectionModalOptions});
    }
  }
  
  const cancelCardSelection = () => {
      setCardSelectionModalOptions({...initialCardSelectionModalOptions});
  }

  const onLocationSelect = (districtIndex: number, locationIndex: number, e: any) => {

    if (player.hasPlayedCard)
      return;
    const selectedCard = getSelectedCard();
    const selectedLocation = G.districts[districtIndex].locations[locationIndex];

    const move = selectedLocation.cost.moves?.find(m => m.moveId == LocationMovesEnum.DISCARD ||m.moveId == LocationMovesEnum.TRASH)

    // Open card selection modal
    if (player.hand.length >= 2 && move) {
      setCardSelectionModalOptions({
        actionName: move.moveId.toUpperCase(),
        isOpen: true,
        isRequired: true,
        cardOptions: _.cloneDeep(player.hand.filter(c => c.id != selectedCard!.id)),
        callback: (selectedCards: Card[]) => moves.placeWorker(G, districtIndex, locationIndex, G.players[ctx.currentPlayer]?.selectedCard, selectedCards),
        selectionLimit: 2
      })
    } else {
      !player.hasPlayedCard || selectedLocation.takenByPlayerID == undefined ? moves.placeWorker(G, districtIndex, locationIndex, G.players[ctx.currentPlayer]?.selectedCard) : null;
    }   
    
    e.stopPropagation();
    
  }

  const currentPlayerNumberOfWorkers = (): number => {
    return G.players[playerID!]?.numberOfWorkers;
  }

  const isLocationDisabled = (location: Location): boolean => {
    return location.isDisabled || !G.players[ctx.currentPlayer]?.selectedCard || player.numberOfWorkers == 0;
  }

  const getSelectedCard = (): Card | undefined => {
    return G.players[ctx.currentPlayer]?.selectedCard;
  }

  const [roundIsEnding, setRoundIsEnding] = useState(false);

return (
  <div className='game-container'>
    {!isNullOrEmpty(matchID) && (
      <>
        {G.districts && G.players && player && (
          <div className="flex w-screen justify-around board">
            <GameInfoComponent
              playersPublicInfo={G.playersViewModel}
              G={G}
              ctx={ctx}
            />

            {/* Board Area */}
            <div className="w-[1280px] h-[720px] relative border-1 box-content" 
              style={{backgroundImage: `url(${mapBg})`,backgroundSize: "cover", width: "100%", height: "1000px"}}
            >
              {G.districts.map((district, dIndex) => (
                <div
                  key={dIndex} 
                  className="district-container absolute" 
                  style={{top: district.y, left: district.x, width: "fit-content", height: "fit-content"}}>
                    <div 
                      className="district-name-container"
                      style={{
                        top: locsYPos[dIndex][0] -60, 
                        left: locsXPos[dIndex][dIndex == 0 ? 2 : dIndex == 3 ? 3 : 0] + (dIndex == 1 || dIndex == 3 ? -180 : 10), 
                        position: "relative", 
                        color: "black", 
                        fontWeight: 600, 
                        backgroundColor: "white",
                        padding: "10px"
                      }}
                    >
                      <div className="district-name">
                        {district.id} - {district.name} |  {ctx.phase != "combatPhase" && district.presence ? G.playersViewModel
                          .map(player => 
                            <span
                              key={player.id}
                              style={{ 
                              fontWeight: "600", 
                              color: PlayerColorsEnum[parseInt(player.id)], 
                              display: "inline"}}
                            > 
                              {district.presence[player.id]?.amount ?? " - "}
                            </span>
                          ) : 
                            <span style={{ 
                                fontWeight: "600", 
                                display: "inline"
                              }}> 
                                Winner:  
                                <span style={{
                                  color: district.combatWinnerId ? PlayerColorsEnum[parseInt(district.combatWinnerId)] : "black"
                                }}> 
                                  {" "}{district.combatWinnerId ? matchData.players[parseInt(district.combatWinnerId)].name :  " - "}
                                </span>
                            </span>
                        }
                      </div>
                    </div>
                  
                  {district.locations.map((location, locIndex) => (
                    <div className="location-container" key={dIndex + "-" + locIndex}>
                      <LocationComponent
                        {...location}
                        x={locsXPos[dIndex][locIndex]} y={locsYPos[dIndex][locIndex]}
                        show={true}
                        district={district}
                        onClick={(e: Event) => onLocationSelect(dIndex, locIndex, e)} 
                        isDisabled={isLocationDisabled(location)}
                      />
                    </div>)
                  )}
                  
                </div>
              ))}
              
              {/* Player Area Component */}
              <PlayerAreaComponent 
                G={G}
                cancelCardSelection={cancelCardSelection}
                cardSelectionModalOptions={cardSelectionModalOptions}
                confirmCardSelection={confirmCardSelection}
                events={events}
                moves={moves}
                onSelectToDiscard={onSelectToDiscard}
                player={player}
                selectedCard={getSelectedCard()}
              />
              
              {/* Combat Phase Modal */}
              <Dialog.Root open={ctx.phase == "combatPhase"}>
                <Dialog.Content style={{
                  top: "230px",
                  width: "100%",
                  height: "100%"
                }}>
                  <Table.Root size="1">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>District</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Winner</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Ranking</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {G.districts.map(d => (
                        <Table.Row>
                          <Table.RowHeaderCell><span style={{ fontWeight: 600 }}>{d.id} - {d.name}</span></Table.RowHeaderCell>
                          <Table.Cell>
                            <span style={{fontStyle: "italic", fontWeight: 600, color: PlayerColorsEnum[parseInt(d.combatWinnerId!)]}}>
                              {d.combatWinnerId ? matchData.players[parseInt(d.combatWinnerId)].name :  " - "}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            { Object.keys(d.presence)
                              .map(k => d.presence[k])
                              .sort((a, b) => a.amount - b.amount)
                              .map((p, i, array) => 
                                <span style={{fontStyle: "italic", fontWeight: 600, color: PlayerColorsEnum[parseInt(p.playerID)]}}>{(p.amount ?? "") } {array.length != i + 1 &&<span style={{ color: "black"}}> / </span>}</span>
                              )}
                            </Table.Cell>
                        </Table.Row>
                      ))}
                      
                    </Table.Body>
                  </Table.Root>
                  <Button 
                    style={{ marginTop: "25px", width: "100%"}}
                    highContrast={true} 
                    color="red" 
                    size={"3"}
                    disabled={roundIsEnding}
                    onClick={() => { moves.endRound(); setRoundIsEnding(true) }}
                  >{ roundIsEnding ? "Waiting for other players..." : "End Round"} </Button>
                </Dialog.Content>
              </Dialog.Root>
            </div>
          </div>
        )}
      </>
    )}
  </div>    
  );
}
