import { ClothesInStoreDTO } from "../../data/dtos/clothesInStore.dto";

export interface ClothesInStoreState {
    myClothes: ClothesInStoreDTO[];
    othersClothes: ClothesInStoreDTO[];
}

export const initialState: ClothesInStoreState = {
    myClothes: [],
    othersClothes: []
};

