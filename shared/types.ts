import { Ctx, DefaultPluginAPIs, PlayerID } from "boardgame.io";
import { DistrictIconsEnum, ResourceEnum } from "./enums";

export type MetaGameState = {
    G: GameState;
    ctx: Ctx;
    playerID: PlayerID;
    random?: any;
    plugins?: DefaultPluginAPIs;
}

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
  presence?: PlayerPresence[]
}

export type PlayerPresence = {
  playerID: string;
  amount: number;
}

export type Location = {
  Id: string;
  name: string;
  cost: LocationCost;
  reward: LocationReward;
  isDisabled?: boolean;
  isSelected?: boolean;
  takenByPlayerID?: string;
  dominanceBy?: string[];
}

export type LocationCost = {
  districtIconIds: string[];
  resources?: ResourceBag[];
  moves?: BoardMove[]; 
}

export type ResourceBag = {
  resourceId: ResourceEnum;
  amount: number
}

export type LocationReward = {
  resources?: ResourceBag[];
  moves?: BoardMove[];
}

export type BoardMove = {
  moveId: string;
  name: string;
  params?: any;
}

export type Card = {
  id: string;
  name: string;
  districtIds: string[];

  // card effects must be atomic in case we need rollback
  primaryEffects?: BoardMove;
  secondaryEffects?: BoardMove;
}

// Utils
export type Dictionary<T> = Record<string, T>;