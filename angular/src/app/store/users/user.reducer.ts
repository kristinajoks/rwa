import { createReducer, on } from "@ngrx/store";
import { loadUserSuccess, loadUserFailure } from "./user.actions";
import { initialState } from "./user.state";

export const userReducer = createReducer(
    initialState,
    on(loadUserSuccess, (state, { user }) => {
        const { closet, ...userWithoutCloset } = user; //a razmislicu da li da ga ucitavam odavde ili kasnije
        return {
            ...state,
            ...userWithoutCloset,
            closetId: user.closet.id,
            error: null,
        };
    }),
    on(loadUserFailure, (state, { error }) => ({
        ...state,
        error,
    }))
);