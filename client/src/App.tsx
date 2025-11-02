import "./App.css";
import "././styles.scss";
import { LobbyComponent } from "./components/lobby-component/LobbyComponent";
import { BoardComponent } from "./components/board-component/BoardComponent";
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

    playerState,
    setServer
  } = useAppStore();

  const server = SocketIO({ server: BACKEND_URL });

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

  const isGameInCourse = () => playerState.matchID != null && playerState.matchID != "";

  return (
      <div className="flex justify-center nes-poiter">
        { !isGameInCourse() ? 
          <LobbyComponent />
            :        
          <GameClientComponent
            matchID={playerState.matchID} 
            playerID={playerState.playerID ? playerState.playerID : "0"} 
            credentials={playerState.playerCredentials ? playerState.playerCredentials : undefined}
          />  
        }
      </div>
  );
}
