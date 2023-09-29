import { createReducer, Action } from "@ngrx/store";
import { AppState, initialState } from "./app.state";

const reducer = createReducer(
    initialState,
    //TODO
);

export function appReducer(state: AppState | undefined, action: Action) {
    return reducer(state, action);
}