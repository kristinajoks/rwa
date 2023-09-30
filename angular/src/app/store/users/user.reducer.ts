import { createReducer, on } from "@ngrx/store";
import { loadUserSuccess, loadUserFailure } from "./user.actions";
import { initialState } from "./user.state";

export const userReducer = createReducer(
    initialState,
    on(loadUserSuccess, (state, { user }) => ({
        ...state,
        user,
        error: null,
    })),
    on(loadUserFailure, (state, { error }) => ({
        ...state,
        user: null,
        error,
    }))
);