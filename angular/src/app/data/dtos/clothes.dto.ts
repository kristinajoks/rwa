export interface createClothesDTO {    
    color: string;
    placement: string;
    type: string;
    occasion: string;
    isForSale: boolean;
    isSold: boolean;
    isFavorite: boolean;
    closetId: number;
    image : File | null;
}