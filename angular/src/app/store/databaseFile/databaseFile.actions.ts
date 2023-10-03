import { createAction, props } from "@ngrx/store";
import { DatabaseFile } from "../../data/models/databaseFile";
import { FileDto } from "../../data/dtos/file.dto";

export const loadDatabaseFile = createAction('[DatabaseFile] Load DatabaseFile', props<{id: number}>());
export const loadDatabaseFileSuccess = createAction('[DatabaseFile] Load DatabaseFile Success', props<{databaseFile: FileDto}>());
export const loadDatabaseFileFailure = createAction('[DatabaseFile] Load DatabaseFile Failure', props<{error: any}>());

export const cleanDatabaseFiles = createAction('[DatabaseFile] Clean DatabaseFiles');