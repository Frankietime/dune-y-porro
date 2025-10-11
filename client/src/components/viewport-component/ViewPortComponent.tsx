import { Box, Container, Flex, Grid, Theme } from "@radix-ui/themes";
import "./viewportComponent.scss";
import { LocationComponent } from "../location-component/LocationComponent";
import { Location, Resource, ResourceEnum, useGame } from "../../store";
import agente from "../../assets/icons/agent-4.png";
import { socket } from "../../socket";
import React from "react";
import player1 from "../../assets/characters/1.png"
import player2 from "../../assets/characters/2.png"
import { BoardComponent } from "../board-component/BoardComponent";

export const ViewportComponent = ({ enabled }: { enabled: boolean }) => {
    const { me, roomId, state, player, setMe, setRoomId, setState, setPlayer } = useGame();

    const [isAgentSelected, setIsAgentSelected] = React.useState(false);

    
    const onAgentClick = () => {
      if (player!.numberOfAgents === 0) return;

      setIsAgentSelected(true);
      JSON.parse(JSON.stringify(player));
      setPlayer({
          ...player!,
          numberOfAgents: player!.numberOfAgents - 1
      })
    } 

    const onLocationSelect = (callback: () => void) => {
        if (!isAgentSelected) return;

        callback();
        setIsAgentSelected(false);

        if (player?.numberOfAgents == 0)
          endTurn();
    }

    const endTurn = () => {
        if (!roomId) return;
        socket.emit("endTurn", { roomId });
      };
  

    const currentPlayer = state?.players[state.turnIndex];

    function randomEnumValue<T extends object>(anEnum: T): T[keyof T] {
            const values = Object.values(anEnum);
            const randomIndex = Math.floor(Math.random() * values.length);
            return values[randomIndex] as T[keyof T];
        }


    const randomLocations: Location[] = [
            {
              index: 1,
                name: "Deep Desert",
                cost: {
                    resource: { type: randomEnumValue(ResourceEnum), amount: 2}
                }
            },
            // {
            //   index: 2,
            //     name: "Intrigue Spot",
            //     cost: {
            //         resource: { type: randomEnumValue(ResourceEnum), amount: 2}
            //     }
            // }
        ];
  

  return (
    (player &&
      <div className="viewport-component">
      {/* <Container> */}
        <Box>
          <div className="nes-container is-dark with-title">
            <p className="title">Game Log</p>
            <p>
              {enabled ? "Es tu turno!" : "Esperando turno..."}
            </p>
          </div>
          <>
          {enabled && (
          <div className="nes-container with-title is-centered">
            <p className="title">Board</p>
              
              <BoardComponent></BoardComponent>
              {randomLocations.map(loc => (
              <LocationComponent
                  key={loc.name}
                  location={loc}
                  resources={player!.resources}
                  position={{top: -650, right: -540}}
                  onSelect={(callback) => onLocationSelect(callback)}
                />
              ))}            
          </div>
          )}
          </>  
        </Box>      
      {/* </Container>  */}
    </div>)
  );
}