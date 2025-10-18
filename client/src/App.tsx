import { LobbyComponent } from "./components/lobby-component/LobbyComponent";
import { BoardComponent } from "./components/board-component/BoardComponent";
import "./App.css";
import "nes.css/css/nes.min.css";
import { useAppStore } from "./store";
import { Context, useEffect, useMemo } from "react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Client as ClientComponent} from "boardgame.io/react";
import { Client as GameClient } from "boardgame.io/client";
import { Game } from "../../shared/Game";
import { _ClientImpl, ClientOpts } from "boardgame.io/dist/types/src/client/client";

export default function App() {

  const {
    client,
    setClient,

    playerProps,
    setServer
  } = useAppStore();

  useEffect(() => {
    client
  }, []);



  const server = SocketIO({ server: 'http://localhost:8000' });

  const GameClientComponent = useMemo(() => {
    const gameClientComponent = ClientComponent({ 
      game: Game, 
      board: BoardComponent,
      multiplayer: server,
    });   
    
    setClient(client);
    setServer(server);

    return gameClientComponent;
  }, [Game]);

  const isGameInCourse = () => playerProps.matchID != null && playerProps.matchID != "";

  return (
      <div className="flex justify-center m-auto my-4 nes-poiter">
        { !isGameInCourse() ? 
          <LobbyComponent />
            :        
          <GameClientComponent
            matchID={playerProps.matchID} 
            playerID={playerProps.playerID ? playerProps.playerID : "0"} 
            credentials={playerProps.playerCredentials ? playerProps.playerCredentials : undefined}
          />  
        }
      </div>
  );
}
