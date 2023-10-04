import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OutfitState } from "./outfits.state";

const selectOutfitsState = createFeatureSelector<OutfitState>('outfits');

export const selectOutfits = createSelector(selectOutfitsState, (state: OutfitState) => state.outfits);
export const selectOutfitToBeAdded = createSelector(selectOutfitsState, (state: OutfitState) => state.outfitToBeAdded);
