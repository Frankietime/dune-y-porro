import { INVALID_MOVE } from "boardgame.io/core";
import { Location, LocationCost, MetaGameState, PlayerGameState, ResourceBag } from "../types";
import { executeMove } from "./moves/movesServices";

// Basic resource helpers
export const hasResources = (player: PlayerGameState, resources?: ResourceBag[]) => {
  if (!resources || resources.length === 0) return true;
  return resources.every(r => (player[r.resourceId] ?? 0) >= r.amount);
};

export const deductResources = (player: PlayerGameState, resources?: ResourceBag[]) => {
  if (!resources || resources.length === 0) return;
  resources.forEach(r => {
    player[r.resourceId] -= r.amount;
  });
};

export const addResources = (player: PlayerGameState, resources?: ResourceBag[]) => {
  if (!resources || resources.length === 0) return;
  resources.forEach(r => {
    player[r.resourceId] += r.amount;
  });
};

// High-level helpers
export const canAffordCost = (
  player: PlayerGameState,
  cost: LocationCost
) => {
  return hasResources(player, cost.resources);
};

export const payLocationCost = (
  mgState: MetaGameState,
  player: PlayerGameState,
  location: Location,
  moveParams?: any
) => {
  const { cost } = location;
  // 1) Resources
  if (!canAffordCost(player, cost)) {
    return INVALID_MOVE;
  }
  deductResources(player, cost.resources);

  // 2) Cost moves (e.g., discard/trash). We rely on caller to pass proper params.
  if (cost.moves && cost.moves.length > 0) {
    cost.moves.forEach(move => {
      const params = moveParams ?? move.params;
      executeMove(mgState, { ...move, params, location });
    });
  }
};

export const grantLocationReward = (
  mgState: MetaGameState,
  player: PlayerGameState,
  location: Location
) => {
  const { reward } = location;
  addResources(player, reward.resources);
  if (reward.moves && reward.moves.length > 0) {
    reward.moves.forEach(move => executeMove(mgState, { ...move, location }));
  }
};
