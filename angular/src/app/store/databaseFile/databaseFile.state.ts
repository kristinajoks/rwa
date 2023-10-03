import { DatabaseFile } from "../../data/models/databaseFile";

export interface DatabaseFileState {
    loading: boolean; //neka ga za sada ali nije neophodno
    loadedDatabaseFiles: DatabaseFile[];
    error: any | null;
}

export const initialState: DatabaseFileState = {
    loading: false,
    loadedDatabaseFiles: [],
    error: null
};