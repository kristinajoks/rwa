import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ClothesInStoreState } from "./clothesInStore.state";

export const selectClothesInStoreState = createFeatureSelector<ClothesInStoreState>('clothesInStore');

export const selectMyClothesInStore = createSelector(selectClothesInStoreState, (state: ClothesInStoreState) => state.myClothes);
export const selectOthetsClothesInStore = createSelector(selectClothesInStoreState, (state: ClothesInStoreState) => state.othersClothes);