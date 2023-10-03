import { createReducer, on } from "@ngrx/store";
import { initialState } from "./closet.state";
import { addClothesFailure, addClothesSuccess, loadCloset, loadClosetFailure, loadClosetSuccess, loadClothesFromClosetSuccess } from "./closet.actions";

export const closetReducer = createReducer(
    initialState,
    on(addClothesSuccess, (state, {clothes}) => {
        return {
            ...state,
            clothes: [...state.clothes, clothes],
            error: null,
        };
    }),
    on(addClothesFailure, (state, {error}) => ({
        ...state,
        error,
    })),
    on(loadClosetSuccess, (state, {closet}) => {
        return {
            ...state,
            id: closet.id,
            error: null,
        };
    }),
    on(loadClosetFailure, (state, {error}) => ({
        ...state,
        error,
    })),
    on (loadClothesFromClosetSuccess, (state, {clothes}) => {
        return {
            ...state,
            clothes: clothes,
            error: null,
        };
    }),
    on(addClothesFailure, (state, {error}) => ({
        ...state,
        error,
    })),
    on(addClothesFailure, (state, {error}) => ({
        ...state,
        error,
    })),
);

