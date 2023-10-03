import { DatabaseFile } from "../../data/models/databaseFile";

export interface DatabaseFileState {
    entities: {[id: number]: DatabaseFile},
    loading: boolean; //neka ga za sada ali nije neophodno
    error: any | null;
}

export const initialState: DatabaseFileState = {
    entities: {},
    loading: false,
    error: null
};