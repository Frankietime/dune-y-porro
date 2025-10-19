import { create } from "zustand";
import { LobbyAPI } from "boardgame.io";

type LobbyState = {
    matchList: LobbyAPI.MatchList, 
    setMatchList: (matchsList: LobbyAPI.MatchList) => void;

    matchName: string, 
    setMatchName: (matchName: string) => void;
}

export const useLobbyStore = create<LobbyState>((set) => ({
    matchList: { matches: [] } as LobbyAPI.MatchList,
    setMatchList: ml => set({matchList: ml}),
    
    matchName: "New Match",
    setMatchName: (matchName: string) => set({matchName}),
}));