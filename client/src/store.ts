import { create } from "zustand";

export type LocationCost = {
  resource: Resource;
}
export type Location = {
  index: number;
  name: string;
  cost: LocationCost;
}

type Player = { 
  id: string; 
  name: string; 
  score: number;
  resources: Resource[];
  power: number;
  numberOfAgents: number;
}

export enum ResourceEnum {
  Water = "water",
  Spice = "spice",
  Solari = "solari",
  Persuasion = "persuasion",
  Power = "power"
}

export type Resource = {
  type: ResourceEnum;
  amount: number;
}
type RoomState = {
  id: string;
  players: Player[];
  turnIndex: number;
  startedAt: number;
  lastActionAt: number;
};

type LocalState = {
  me?: Player;
  roomId?: string;
  state?: RoomState;
  player?: Player;
  setMe: (p?: Player) => void;
  setRoomId: (id?: string) => void;
  setState: (s?: RoomState) => void;
  setPlayer: (p: Player) => void;
};

export const useGame = create<LocalState>((set) => ({
  me: undefined,
  roomId: undefined,
  state: undefined,
  setMe: (me) => set({ me }),
  setRoomId: (roomId) => set({ roomId }),
  setState: (state) => set({ state }),
  setPlayer: (player: Player) => set({ player }),
}));