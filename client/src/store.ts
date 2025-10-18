import { create } from "zustand";
import { Player } from "./types";
import { LobbyAPI } from "boardgame.io";

type AppState = {
  playerProps: Player;
  setPlayerProps: (p: Player) => void;

  matchData: any;
  setMatchData: (m: any) => void;

  client: any;
  setClient: (client: any) => void;

  server: any;
  setServer: (client: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  playerProps: { name: "Player 1"} as Player,
  setPlayerProps: (p) => set({ playerProps: p }),
  
  matchData: {} as LobbyAPI.Match,
  setMatchData: (m) => set({ matchData: m }),

  client: {},
  setClient: (client: any) => set({ client }),

  server: {},
  setServer: (server: any) => set({ server })
}));