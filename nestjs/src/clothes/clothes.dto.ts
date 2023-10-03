import { IsEnum, IsNotEmpty } from "class-validator";
import { ClothesOccasion, ClothesPlacement, ClothesType } from "../shared/enums";

export class createClothesDTO {
    
    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    @IsEnum(ClothesPlacement)
    placement: ClothesPlacement;

    @IsNotEmpty()
    @IsEnum(ClothesType)
    type: ClothesType;

    @IsNotEmpty()
    @IsEnum(ClothesOccasion)
    occasion: ClothesOccasion;

    @IsNotEmpty()
    isForSale: boolean;

    @IsNotEmpty()
    isSold: boolean;

    @IsNotEmpty()
    isFavorite: boolean;

    @IsNotEmpty()
    closetId: number;

}