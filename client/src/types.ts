export type LocationCost = {
  resource: Resource;
}

export type District = {
  name: string;
  y: number;
  x: number;
  locations: Location[];
}
export type Location = {
  index: number;
  x: number;
  y: number;
  name: string;
  cost: LocationCost;
  isDisabled?: boolean;
  isSelected?: boolean;
}

export type Player = { 
    playerID: string; 
    name: string; 
    matchID: string;  
    playerCredentials: string;  
}

export enum ResourceEnum {
  Water = "water",
  Spice = "spice",
  Solari = "solari"
}

export type Resource = {
  type: ResourceEnum;
  amount: number;
}

export type RoomState = {
  id: string;
  players: Player[];
  turnIndex: number;
  startedAt: number;
  lastActionAt: number;
};

export type LocalState = {
  me?: Player;
  roomId?: string;
  state?: RoomState;
  player?: Player;
  setMe: (p?: Player) => void;
  setRoomId: (id?: string) => void;
  setState: (s?: RoomState) => void;
  setPlayer: (p: Player) => void;
};