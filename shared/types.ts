import { DistrictIconsEnum, ResourceEnum } from "./enums";
import { Card } from "./services/types";

export interface GameState {
  players: Dictionary<PlayerGameState>;
  districts: District[];
  cardMarket: Card[];
}

export type PlayerGameState = {
  cardsInPlay?: Card[];
  hasPlayedCard: boolean;
  numberOfWorkers: number;
  selectedCard?: Card;
  [ResourceEnum.Candy]: number;
  [ResourceEnum.Loot]: number;
  victoryPoints: number;
  deck: Card[];
  discardPile: Card[];
  trashPile: Card[];
  hand: Card[];
}

export type PlayerState = { 
  playerID: string; 
  name: string; 
  matchID: string;  
  playerCredentials: string;
}

export type District = {
  id: DistrictIconsEnum;
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

// Utils
export type Dictionary<T> = Record<string, T>;