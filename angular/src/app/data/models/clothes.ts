import { ClothesOccasion } from "../enums/clothesOccasion";
import { ClothesPlacement } from "../enums/clothesPlacement";
import { ClothesType } from "../enums/clothesType";
import { Closet } from "./closet";
import { DatabaseFile } from "./databaseFile";
import { Outfit } from "./outfit";

export interface Clothes{
    id: number;
    color: string;
    placement: ClothesPlacement;
    type: ClothesType;
    occasion: ClothesOccasion;
    isForSale: boolean;
    isSold: boolean;
    isFavorite: boolean;
    closet: Closet;
    outfits: Outfit[];   
    avatar: DatabaseFile | null;
    avatarId: number | null;
    image : File | null;
}