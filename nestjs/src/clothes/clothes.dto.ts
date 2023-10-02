import { IsNotEmpty } from "class-validator";

export class createClothesDTO {
    
    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    placement: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    occasion: string;

    @IsNotEmpty()
    src: string;

    @IsNotEmpty()
    isForSale: boolean;

    @IsNotEmpty()
    isSold: boolean;

    @IsNotEmpty()
    isFavorite: boolean;

    @IsNotEmpty()
    closetId: number;

}