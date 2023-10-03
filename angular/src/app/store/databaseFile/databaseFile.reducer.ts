import { createReducer, on } from "@ngrx/store";
import { initialState } from "./databaseFile.state";
import { loadDatabaseFileSuccess, loadDatabaseFileFailure } from "./databaseFile.actions";

export const databaseFileReducer = createReducer(
  initialState,
  on(loadDatabaseFileSuccess, (state, { databaseFile }) => {
    console.log(databaseFile);
    console.log(state)
    console.log(state.loadedDatabaseFiles);
    return{
    ...state,  loading: false,
    loadedDatabaseFiles: [...state.loadedDatabaseFiles, databaseFile],
    error: null,
  };
}),
  on(loadDatabaseFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
