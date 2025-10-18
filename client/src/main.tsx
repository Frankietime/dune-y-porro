import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LobbyProvider } from "./lib/LobbyProvider";
import { Game } from "../../shared/Game";
import { BoardComponent } from "./components/board-component/BoardComponent";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LobbyProvider
        serverUrl="http://localhost:8000" 
        gameComponents={[ { game: Game, board: BoardComponent } ]}
      >
        <App />
      </LobbyProvider>
    </QueryClientProvider>
  </React.StrictMode>
);