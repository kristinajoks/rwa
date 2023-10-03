import { createReducer, on } from "@ngrx/store";
import { initialState } from "./databaseFile.state";
import { loadDatabaseFileSuccess, loadDatabaseFileFailure, loadDatabaseFile, cleanDatabaseFiles } from "./databaseFile.actions";

export const databaseFileReducer = createReducer(
  initialState,
  on(loadDatabaseFile, (state) => ({
    ...state,
    loading: true,
    loadedDatabaseFiles: [],
    error: null,
  })),
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
  })),
  on(cleanDatabaseFiles, (state) => ({
    ...state,
    loading: false,
    loadedDatabaseFiles: [],
    error: null,
  }))
);
