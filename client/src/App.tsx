import { LobbyComponent } from "./components/lobby-component/LobbyComponent";
import { BoardComponent } from "./components/board-component/BoardComponent";
import "./App.css";
import { useAppStore } from "./store";
import { useMemo } from "react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Client } from "boardgame.io/react";
import { Game } from "../../shared/Game";

export default function App() {

  const {
    playerProps,
    setGameClient,
    setServer
  } = useAppStore();

  const server = SocketIO({ server: 'http://localhost:8000' });

  const GameClientComponent = useMemo(() => {
    const client = Client({ 
      game: Game, 
      board: BoardComponent,
      multiplayer: server
    });

    setGameClient(client);
    setServer(server);

    return client;
  }, [Game]);

  const isGameInCourse = () => playerProps.matchID != null && playerProps.matchID != "";

  return (
      <div className="flex justify-center m-auto my-4">
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
