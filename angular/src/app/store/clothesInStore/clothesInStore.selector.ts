import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ClothesInStoreState } from "./clothesInStore.state";

export const selectClothesInStoreState = createFeatureSelector<ClothesInStoreState>('clothesInStore');

export const selectClothesInStore = createSelector(selectClothesInStoreState, (state: ClothesInStoreState) => state.clothes);