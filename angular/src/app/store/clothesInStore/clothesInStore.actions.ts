//na osnovu idja korisnika povuce se njegov ormar, zatim se po idju ormana povuce lista stvari koje su na prodaju
//a zatim se za svaku stvar povuce njen avatar

import { createAction, props } from "@ngrx/store";
import { ClothesInStoreDTO } from "../../data/dtos/clothesInStore.dto";
import { Clothes } from "../../data/models/clothes";

export const getClothesInTheStore = createAction('[Shop] Get Clothes In The Store', props<{userId: number}>());
export const getClothesInTheStoreSuccess = createAction('[Shop] Get Clothes In The Store Success', props<{clothesInStore: ClothesInStoreDTO}>());

export const loadClothesFromClosetForSale = createAction('[Shop] Load Clothes For Sale', props<{id: number}>());
export const loadClothesFromClosetForSaleSuccess = createAction('[Shop] Load Clothes For Sale Success', props<{clothes: Clothes[]}>());
export const loadClothesFromClosetForSaleFailure = createAction('[Shop] Load Clothes For Sale Failure', props<{error: any}>());