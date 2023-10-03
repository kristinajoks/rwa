import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DatabaseFileState } from "./databaseFile.state";

export const selectDatabaseFileState = createFeatureSelector<DatabaseFileState>('databaseFile');

export const selectDatabaseFileLoading = createSelector(selectDatabaseFileState, (state: DatabaseFileState) => state.loading);
export const selectDatabaseFileLoadedDatabaseFiles = createSelector(selectDatabaseFileState, (state: DatabaseFileState) => state.loadedDatabaseFiles);