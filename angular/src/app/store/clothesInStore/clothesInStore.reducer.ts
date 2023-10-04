import { createReducer, on } from "@ngrx/store";
import { initialState } from "./clothesInStore.state";
import { loadClothesFromCloset, loadClothesFromClosetSuccess } from "../closet/closet.actions";

export const clothesInStoreReducer = createReducer(
    initialState,
    on(loadClothesFromCloset, (state) => ({
        ...state,
        clothes: []
    })),
    on(loadClothesFromClosetSuccess, (state, { clothes }) => {
        const clothesForSale = clothes.filter((item) => item.isForSale == true && item.isSold == false);

        const mappedClothes = clothesForSale.map((item) => ({
            clothesId: item.id,
            isSold: item.isSold,
            clothesType: item.type,
            filename: item.color + ".png"
        }));
        const updatedClothes = [...state.clothes, ...mappedClothes];
        return {
            ...state,
            clothes: updatedClothes
        };
    }),
    
);