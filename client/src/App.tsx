import { LobbyComponent } from "./components/lobby-component/LobbyComponent";
import { BoardComponent } from "./components/board-component/BoardComponent";
import "./App.css";
import "nes.css/css/nes.min.css";
import "@fontsource/press-start-2p";
import { useAppStore } from "./store";
import { useEffect, useMemo } from "react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Client as ClientComponent} from "boardgame.io/react";
import { Game } from "../../shared/Game";
import { _ClientImpl } from "boardgame.io/dist/types/src/client/client";
import { BACKEND_URL } from "./config";

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



  const server = SocketIO({ server: BACKEND_URL });

  const GameClientComponent = useMemo(() => {
    const gameClientComponent = ClientComponent({ 
      game: Game, 
      board: BoardComponent,
      multiplayer: server,
      numPlayers: 999999
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
