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
  worker?: string;
}

export type PlayerState = { 
    playerID: string; 
    name: string; 
    matchID: string;  
    playerCredentials: string;  
}

export type PlayerGameState = {
    hasPlayedCard: boolean;
    numberOfWorkers: number;
    selectedCard: number;
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