import { ClothesOccasion } from "../enums/clothesOccasion";
import { ClothesPlacement } from "../enums/clothesPlacement";
import { ClothesType } from "../enums/clothesType";
import { Closet } from "./closet";
import { Outfit } from "./outfit";

export interface Clothes{
    id: number;
    color: string;
    placement: ClothesPlacement;
    type: ClothesType;
    occasion: ClothesOccasion;
    src: string;
    isForSale: boolean;
    isSold: boolean;
    isFavorite: boolean;
    closet: Closet;
    outfits: Outfit[];   
}