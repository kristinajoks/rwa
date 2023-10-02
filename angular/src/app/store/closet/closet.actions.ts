import { createAction, props } from "@ngrx/store";
import { Clothes } from "../../data/models/clothes";
import { createClothesDTO } from "../../data/dtos/clothes.dto";
import { Closet } from "../../data/models/closet";

export const addClothesToCloset = createAction('[Closet] Add Clothes', props<{clothes: createClothesDTO}>());
export const addClothesSuccess = createAction('[Closet] Add Clothes Success', props<{clothes: Clothes}>());
export const addClothesFailure = createAction('[Closet] Add Clothes Failure', props<{error: any}>());

export const loadClothesFromCloset = createAction('[Closet] Load Clothes', props<{id: number}>());
export const loadClothesFromClosetSuccess = createAction('[Closet] Load Clothes Success', props<{clothes: Clothes[]}>());
export const loadClothesFromClosetFailure = createAction('[Closet] Load Clothes Failure', props<{error: any}>());

export const loadCloset = createAction('[Closet] Load Closet', props<{id: number}>());
export const loadClosetSuccess = createAction('[Closet] Load Closet Success', props<{closet: Closet}>());
export const loadClosetFailure = createAction('[Closet] Load Closet Failure', props<{error: any}>());
