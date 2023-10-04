//na osnovu idja korisnika povuce se njegov ormar, zatim se po idju ormana povuce lista stvari koje su na prodaju
//a zatim se za svaku stvar povuce njen avatar

import { createAction, props } from "@ngrx/store";
import { ClothesInStoreDTO } from "../../data/dtos/clothesInStore.dto";

export const getClothesInTheStore = createAction('[ClothesInStore] Get Clothes In The Store', props<{userId: number}>());
export const getClothesInTheStoreSuccess = createAction('[ClothesInStore] Get Clothes In The Store Success', props<{clothesInStore: ClothesInStoreDTO}>());