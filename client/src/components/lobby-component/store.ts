import { create } from "zustand";
import { LobbyAPI } from "boardgame.io";
import { BattleEvent, generateBattleEvent } from "./helper";

type LobbyState = {

    matchList: LobbyAPI.MatchList, 
    setMatchList: (matchsList: LobbyAPI.MatchList) => void;

    matchLore: BattleEvent, 
    setMatchLore: (matchLore: BattleEvent) => void;
}

export const useLobbyStore = create<LobbyState>((set) => ({
    
    matchList: { matches: [] } as LobbyAPI.MatchList,
    setMatchList: ml => set({matchList: ml}),
    
    matchLore: {...generateBattleEvent()},
    setMatchLore: (matchLore: BattleEvent) => set({matchLore}),
}));