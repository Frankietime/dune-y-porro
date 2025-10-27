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
  resourceIds: string[];
}

export type LocationReward = {
  resourceIds: string[];
  moves: string[];
}

// Utils
export type Dictionary<T> = Record<string, T>;