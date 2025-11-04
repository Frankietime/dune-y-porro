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
import { useEffect, useMemo, useState } from "react";
import { Card } from "../../../../shared/types";
import "./BoardComponent.scss";
import { DistrictIconComponent } from "../icon-components/DistrictIconComponent";
import { LocationMovesEnum } from "../../../../shared/enums";
import { CardComponent } from "../card-components/CardComponent";
import _ from "lodash";
import { Button, Dialog, Flex, Text, TextField, Tooltip } from "@radix-ui/themes";

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

  type CardSelectionModalOptions = {
    actionName: string;
    isOpen: boolean;
    cardOptions: Card[];
    cardsSelected?: Card[];
    isRequired: boolean;
    callback: (selectedCards: Card[]) => void;
    selectionLimit: number;
  }

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

  const onLocationSelect = (districtIndex: number, locationIndex: number) => {
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
      moves.placeWorker(G, districtIndex, locationIndex, G.players[ctx.currentPlayer]?.selectedCard);
    }    
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

        {G.districts && (

          <div className="flex w-screen justify-around board">
            <div className="w-[1280px] h-[720px] relative border-1 box-content" 
              style={{backgroundImage: `url(${mapBg})`,backgroundSize: "cover", width: "100%", height: "1000px"}}
            >
              {G.districts.map((district, dIndex) => (
                <div
                  key={dIndex} 
                  className="relative" 
                  style={{top: district.y, left: district.x, width: "fit-content", height: "fit-content"}}>
                  
                  {district.locations.map((location, locIndex) => (
                    <div>
                      <LocationComponent
                        {...location}
                        key={dIndex + "-" + locIndex}
                        x={locsXPos[dIndex][locIndex]} y={locsYPos[dIndex][locIndex]}
                        show={true}
                        district={district}
                        onClick={() => onLocationSelect(dIndex, locIndex)} 
                        isDisabled={isLocationDisabled(location)}
                      />
                    </div>)
                  )}
                  
                </div>
              ))}
              
              {/* Player Area Component */}
              <WorkerComponent
                numerOfWorkers={currentPlayerNumberOfWorkers()}
                x={281} y={463}
                mirror={0}
                playerID={parseInt(playerID!)}
              />              
              
              <Hud 
                onPass={() => onTurnEnd()}
                onReveal={() => alert("Reveal!")}
                onArrowUp={() => alert("arrow up")}
                onArrowDown={() => alert("arrow down")}
              >
                <div className="player-resource-container absolute">
                  <div>VP<hr /><div>{player.victoryPoints}</div></div>
                  <div>Candy<hr /><div>{player.candy}</div></div>
                  <div>Loot<hr /><div>{player.loot}</div></div>        
                  <div>Deck<hr /><div>{player.deck.length}</div></div>        
                  <Tooltip content={player.discardPile.length > 0 ? player.discardPile.map(t => t.name).join(" - ") : "Discard Pile"}><div>Discard<hr /><div>{player.discardPile.length}</div></div></Tooltip>  
                  <Tooltip content={player.trashPile.length > 0 ? player.trashPile.map(t => t.name).join(" - ") : "Trash Pile"}><div>Trash<hr /><div>{player.trashPile.length}</div></div></Tooltip>   
                </div>
      
              <div className="hand-container" style={{
                width: "200px", position: "relative", top: "240px", left: "295px"
              }}>
                {cardSelectionModalOptions.isOpen && (
                  <>
                    {/* <button style={{
                      top: "600px",
                      left: "200px",
                      position: "relative",
                      backgroundColor: "red",
                      padding: "5px"
                    }}
                      onClick={confirmCardSelection}  
                    >
                      CONFIRM
                    </button>
                    <button style={{
                      top: "620px",
                      left: "200px",
                      position: "relative",
                      backgroundColor: "blue",
                      padding: "5px"
                    }}
                    onClick={cancelCardSelection}  
                  >
                    CANCEL
                  </button> */}
                </>
                )}
                {!cardSelectionModalOptions.isOpen ? player.hand?.map((card: Card, index) => 
                  
                  // hand
                  <CardComponent
                      isSelected={card.id == getSelectedCard()?.id}
                      y={540} x={390 + index*105} show={true} 
                      key={`card-${card.id}-${index}`} 
                      onClick={() => onSelectCard(card)}
                      card={card}
                  >
                  </CardComponent>
                ) :
                (
                // card selection for discard or trash
                <Dialog.Root open={cardSelectionModalOptions.isOpen}>

                  <Dialog.Content height={"300px"} maxWidth={"1000px"}>
                    <Dialog.Title><Flex justify={"center"}>{cardSelectionModalOptions.actionName}</Flex></Dialog.Title>
                    <Flex>
                      {cardSelectionModalOptions.cardOptions.map((card, index) => (
                        <CardComponent
                            isSelected={cardSelectionModalOptions.cardsSelected?.map(c => c.id).includes(card.id)}
                            y={120} x={20 + index*105} show={true} 
                            key={`card-${card.id}-${index}`} 
                            onClick={() => onSelectToDiscard(card, cardSelectionModalOptions.selectionLimit)}
                            card={card}
                            selectionColor={"red"}
                        >
                        </CardComponent>
                      ))}
                    </Flex>

                    <Flex gap="3" justify="center">
                      <Dialog.Close>
                        <Button variant="soft" color="gray" onClick={confirmCardSelection}>
                          Confirm Selection
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button onClick={cancelCardSelection}>Cancel Selection</Button>
                      </Dialog.Close>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
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
