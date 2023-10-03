import { createFeatureSelector } from "@ngrx/store";
import { DatabaseFileState } from "./databaseFile.state";

export const selectDatabaseFileState = createFeatureSelector<DatabaseFileState>('databaseFile');

export const selectDatabaseFileEntities = (state: DatabaseFileState) => state.entities;
export const selectDatabaseFileLoading = (state: DatabaseFileState) => state.loading;