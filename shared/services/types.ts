import { BoardMove } from "../types";

export type Card = {
  id: string;
  name: string;
  districtIds: string[];
  primaryEffects?: BoardMove[];
  secondaryEffects?: BoardMove[];
}