import { BoardMove } from "../types";

export type Card = {
  id: string;
  name: string;
  districtIds: string[];

  // card effects must be atomic in case we need rollback
  primaryEffects?: BoardMove;
  secondaryEffects?: BoardMove;
}