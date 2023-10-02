import { Clothes } from "../../data/models/clothes";

export interface ClosetState{
    id: number;
    clothes: Clothes[];
    error: any | null;
}

export const initialState: ClosetState = {
    id: -1,
    clothes: [],
    error: null
};