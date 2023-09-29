import { Clothes } from "./clothes";
import { Outfit } from "./outfit";
import { User } from "./user";

export interface Closet {
    id: number;
    owner: User;
    clothes: Clothes[];
    outfits: Outfit[];
}