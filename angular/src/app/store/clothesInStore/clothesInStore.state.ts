import { ClothesInStoreDTO } from "../../data/dtos/clothesInStore.dto";

export interface ClothesInStoreState {
    clothes: ClothesInStoreDTO[];
}

export const initialState: ClothesInStoreState = {
    clothes: []
};