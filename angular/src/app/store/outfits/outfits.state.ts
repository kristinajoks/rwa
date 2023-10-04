import { OutfitDTO } from "../../data/dtos/outfit.dto";

export interface OutfitState{
    outfitToBeAdded: OutfitDTO | null;
    outfits: OutfitDTO[];
    error: any | null;
}

export const initialState: OutfitState = {
    outfitToBeAdded: null,
    outfits: [],
    error: null
};