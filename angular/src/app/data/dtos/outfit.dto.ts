export interface ClothesOutfitDTO{
    clothesId: number;
    src: string;
}

export interface OutfitDTO {
    id: number;
    closetId: number;
    clothes: ClothesOutfitDTO[];
}