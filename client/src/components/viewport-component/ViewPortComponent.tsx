import { Box, Container, Flex, Grid, Theme } from "@radix-ui/themes";
import "./ViewPortComponent.scss";
import { LocationComponent } from "../location-component/LocationComponent";
import { Location, Resource, ResourceEnum, useGame } from "../../store";
import agente from "../../assets/icons/agent-4.png";
import { socket } from "../../socket";
import React from "react";
import player1 from "../../assets/characters/1.png"
import player2 from "../../assets/characters/2.png"

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
            {
              index: 2,
                name: "Intrigue Spot",
                cost: {
                    resource: { type: randomEnumValue(ResourceEnum), amount: 2}
                }
            }
        ];
  

  return (
    (player &&
      <div className="viewport-component">
        <Grid columns="3">
         <Box>
        <img src={player1} width="300px" height="450x" />
          
          </Box> 
      <Container>
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
            <p className="title">Locations</p>
            <Box ml="100px" mr="100px" mt="50px" mb="50px" height="300px">
              {randomLocations.map(loc => (
              <LocationComponent
                  key={loc.name}
                  location={loc}
                  resources={player!.resources}
                  onSelect={(callback) => onLocationSelect(callback)}
                />
              ))}
              
            </Box>
          </div>
          )}

          <div className="nes-container  with-title">
            <p className="title">Player Area</p>
            <Grid columns="3" rows="repeat(1, 64px)" width="auto" height="100px">
              <Box width="300px">
                <div className="nes-container is-dark with-title">
                  <p className="title">Resources</p>
                  {currentPlayer?.resources?.map((res) => (<span>{ res.type + ": " + res.amount + " | " }</span>))}
                </div>
              </Box>
              <Box>

              </Box>
              <Flex>
                {enabled && Array.from({ length: player!.numberOfAgents }).map((_, i) => (
                  <div key={i}>
                    <img onClick={ () => {
                      if (isAgentSelected) return;
                      onAgentClick()
                    }}
                    src={agente} alt="Agent Icon" />
                  </div>
                ))}
              </Flex>
                
                
            </Grid>
          </div>
          </>  
        </Box>
      
      </Container>
      <Box>
        <img src={player2} width="300px" height="450x" />
      </Box>
      </Grid>
      
    </div>)
  );
}