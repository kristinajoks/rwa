export enum ClothesPlacement {
    TOP = "top",
    BOTTOM = "bottom",
    SHOES = "shoes",
    ACCESSORY = "accessory",
    OTHER = "other"
}

export enum ClothesType{
    TSHIRT = "tshirt",
    TOP = "top",
    VEST = "vest",
    PANTS = "pants",
    DRESS = "dress",
    SKIRT = "skirt",
    SHOES = "shoes",
    JEWERLY = "jewerly",
    OTHER = "other"
}

export enum ClothesOccasion{
    CASUAL = "casual",
    FORMAL = "formal",
    SPORT = "sport",
    OTHER = "other"
}

export function getPlacementFromString(value: string) : ClothesPlacement{
    if(
        Object.values(ClothesPlacement).includes(value as ClothesPlacement)){
        return value as ClothesPlacement;
        }
        return ClothesPlacement.OTHER;
}

export function getTypeFromString(value: string) : ClothesType{
    if(
        Object.values(ClothesType).includes(value as ClothesType)){
        return value as ClothesType;
        }
        return ClothesType.OTHER;
}

export function getOccasionFromString(value: string) : ClothesOccasion{
    if(
        Object.values(ClothesOccasion).includes(value as ClothesOccasion)){
        return value as ClothesOccasion;
        }
        return ClothesOccasion.OTHER;
}
