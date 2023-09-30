import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserId = createSelector(selectAuthState, (state: AuthState) => state.userId);
export const selectToken = createSelector(selectAuthState, (state: AuthState) => state.token);
export const selectIsAuthenticated = createSelector(selectAuthState, (state: AuthState) => state.isAuthenticated);
export const selectError = createSelector(selectAuthState, (state: AuthState) => state.error);

