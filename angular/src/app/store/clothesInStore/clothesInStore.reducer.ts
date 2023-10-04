import { createReducer, on } from "@ngrx/store";
import { initialState } from "./clothesInStore.state";
import { loadClothesFromCloset, loadClothesFromClosetSuccess } from "../closet/closet.actions";
import { loadClothesFromClosetForSaleSuccess } from "./clothesInStore.actions";
import { logoutUserSuccess } from "../auth/auth.actions";

export const clothesInStoreReducer = createReducer(
    initialState,
    //mozda i na loadUser neka izmena nesto
    on(loadClothesFromCloset, (state) => ({
        ...state,
        myClothes: []
    })),
    on(loadClothesFromClosetSuccess, (state, { clothes }) => {
        const clothesForSale = clothes.filter((item) => item.isForSale == true && item.isSold == false);

        const mappedClothes = clothesForSale.map((item) => ({
            clothesId: item.id,
            isSold: item.isSold,
            clothesType: item.type,
            filename: item.color + ".png"
        }));
        const updatedClothes = [...state.myClothes, ...mappedClothes];
        return {
            ...state,
            myClothes: updatedClothes
        };
    }),
    on(loadClothesFromClosetForSaleSuccess, (state, { clothes }) => {
        const clothesForSale = clothes.filter((item) => item.isForSale == true && item.isSold == false);

        const mappedClothes = clothesForSale.map((item) => ({
            clothesId: item.id,
            isSold: item.isSold,
            clothesType: item.type,
            filename: item.color + ".png"
        }));
        const updatedClothes = [...state.othersClothes, ...mappedClothes];
        return {
            ...state,
            othersClothes: updatedClothes
        };
    }),
    on(logoutUserSuccess, (state) => ({
        ...state,
        myClothes: [],
        othersClothes: []
    }))
);