import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, (state: UserState) => state);

export const selectUserId = createSelector(selectUserState, (state: UserState) => state.id);
export const selectName = createSelector(selectUserState, (state: UserState) => state.name);
export const selectSurname = createSelector(selectUserState, (state: UserState) => state.surname);
export const selectUsername = createSelector(selectUserState, (state: UserState) => state.username);
export const selectEmail = createSelector(selectUserState, (state: UserState) => state.email);
export const selectClosetId = createSelector(selectUserState, (state: UserState) => state.closetId);
export const selectRole = createSelector(selectUserState, (state: UserState) => state.role);
export const selectError = createSelector(selectUserState, (state: UserState) => state.error);