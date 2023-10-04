import { ClothesType } from "../enums/clothesType";

export interface ClothesInStoreDTO{
    clothesId: number;
    isSold: boolean;
    clothesType: ClothesType;
    filename: string;
}

export interface OthersClothesDTO{ //trial
    userId: number;
    username: string;
    clothesId: number;
    isSold: boolean;
    clothesType: ClothesType;
    filename: string;
}