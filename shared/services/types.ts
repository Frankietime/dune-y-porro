
export type Card = {
  id: string;
  name: string;
  districtIds: string[];
  primaryEffects?: string[];
  secondaryEffects?: string[];
}