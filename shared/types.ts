import { ResourceEnum } from "./enums";

export interface GameState {
  players: Dictionary<PlayerGameState>;
  districts: District[];
}

export type PlayerGameState = {
  cardsInPlay?: Card[];
  hasPlayedCard: boolean;
  numberOfWorkers: number;
  selectedCard?: Card;
  [ResourceEnum.Candy]: number;
  [ResourceEnum.Loot]: number;
  victoryPoints: number;
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

// export type LocationCost = {
//   districtIconIds: string[];
//   resourceIds: string[];
// }

export type LocationCost = {
  districtIconIds: string[];
  resources: ResourceBag[];
}

export type ResourceBag = {
  resourceId: ResourceEnum;
  amount: number
}

export type LocationReward = {
  resources: ResourceBag[];
  moves: string[];
}

export type Card = {
  id: number;
  districtIds: string[];
}

// Utils
export type Dictionary<T> = Record<string, T>;