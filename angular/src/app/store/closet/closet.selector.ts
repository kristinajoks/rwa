import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectClosetState = createFeatureSelector('closet');

export const selectClosetId = createSelector(selectClosetState, (state: any) => state.id);
export const selectClothes = createSelector(selectClosetState, (state: any) => state.clothes);
export const selectError = createSelector(selectClosetState, (state: any) => state.error);