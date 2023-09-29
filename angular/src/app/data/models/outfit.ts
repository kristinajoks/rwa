import { Closet } from "./closet";
import { Clothes } from "./clothes";

export interface Outfit {
    id: number;
    clothes: Clothes[];
    closet: Closet;
}