import { ClothesType } from "../enums/clothesType";

export interface ClothesInStoreDTO{
    clothesId: number;
    isSold: boolean;
    clothesType: ClothesType;
    filename: string;
}
