import { ResourceEnum } from "./enums";

export interface GameState {
  players: Dictionary<PlayerGameState>;
  districts: District[];
}

export type PlayerGameState = {
  hasPlayedCard: boolean;
  numberOfWorkers: number;
  selectedCard: number;
}

export type PlayerState = { 
  playerID: string; 
  name: string; 
  matchID: string;  
  playerCredentials: string;  
}

export type District = {
  name: string;
  y: number;
  x: number;
  locations: Location[];
}

export type Location = {
  Id: string;
  name: string;
  cost: LocationCost;
  reward: LocationReward;
  isDisabled?: boolean;
  isSelected?: boolean;
  takenByPlayerID?: string;
}

export type LocationCost = {
  locationIconIds: string[];
  resources: ResourceCost[];
}

export type LocationReward = {
  resources: ResourceCost[];
  moves: string[];
}

export type ResourceCost = {
  resourceId: string;
  amount: number;
}

// Utils

export type Dictionary<T> = Record<string, T>;