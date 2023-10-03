import { createReducer, on } from "@ngrx/store";
import { initialState } from "./databaseFile.state";
import { loadDatabaseFileSuccess, loadDatabaseFileFailure } from "./databaseFile.actions";

export const databaseFileReducer = createReducer(
  initialState,
  on(loadDatabaseFileSuccess, (state, { databaseFile }) => ({
    ...state,
    entities: { ...state.entities, [databaseFile.id]: databaseFile },
    loading: false,
    error: null,
  })),
  on(loadDatabaseFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
