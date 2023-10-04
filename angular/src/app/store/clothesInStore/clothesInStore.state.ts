import { ClothesInStoreDTO, OthersClothesDTO } from "../../data/dtos/clothesInStore.dto";

export interface ClothesInStoreState {
    myClothes: ClothesInStoreDTO[];
    // othersClothes: OthersClothesDTO[];
    othersClothes: ClothesInStoreDTO[];
}

export const initialState: ClothesInStoreState = {
    myClothes: [],
    othersClothes: []
};

