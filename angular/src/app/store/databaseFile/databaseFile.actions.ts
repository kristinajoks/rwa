import { createAction, props } from "@ngrx/store";
import { DatabaseFile } from "../../data/models/databaseFile";

export const loadDatabaseFile = createAction('[DatabaseFile] Load DatabaseFile', props<{id: number}>());
export const loadDatabaseFileSuccess = createAction('[DatabaseFile] Load DatabaseFile Success', props<{databaseFile: DatabaseFile}>());
export const loadDatabaseFileFailure = createAction('[DatabaseFile] Load DatabaseFile Failure', props<{error: any}>());