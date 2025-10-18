import { create } from "zustand";
import { Player } from "./types";
import { LobbyAPI } from "boardgame.io";

type AppState = {
  playerProps: Player;
  setPlayerProps: (p: Player) => void;

  matchData: any;
  setMatchData: (m: any) => void;

  gameClient: any;
  setGameClient: (gameClient: any) => void;

  server: any;
  setServer: (gameClient: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  playerProps: { name: "Player 1"} as Player,
  setPlayerProps: (p) => set({ playerProps: p }),
  
  matchData: {} as LobbyAPI.Match,
  setMatchData: (m) => set({ matchData: m }),

  gameClient: {},
  setGameClient: (gameClient: any) => set({ gameClient }),

  server: {},
  setServer: (server: any) => set({ server })
}));