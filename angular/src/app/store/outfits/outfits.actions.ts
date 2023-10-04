import { createAction, props } from "@ngrx/store";
import { OutfitDTO } from "../../data/dtos/outfit.dto";
import { Outfit } from "../../data/models/outfit";
import { Clothes } from "../../data/models/clothes";

export const getOutfits = createAction('[Outfits] Get Outfits');
export const getOutfitsSuccess = createAction('[Outfits] Get Outfits Success', props<{outfits: Outfit[]}>());
export const getOutfitsFailure = createAction('[Outfits] Get Outfits Failure', props<{error: any}>());

export const initializeOutfit = createAction('[Outfits] Initialize Outfit', props<{closetId: number}>());
export const addClothesToOutfit = createAction('[Outfits] Add Clothes To Outfit', props<{clothesId: number}>());
export const addClothesToOutfitSuccess = createAction('[Outfits] Add Clothes To Outfit Success', props<{clothes: Clothes}>());
export const addClothesToOutfitFailure = createAction('[Outfits] Add Clothes To Outfit Failure', props<{error: any}>());

export const removeClothesFromOutfit = createAction('[Outfits] Remove Clothes From Outfit', props<{clothesId: number}>());

//na dugme add da dodam odecu u autfit koja se pamti u to be added, a onda na make outfit 
//se nalazi user closet id i outfit to be added, pravi dto i poziva addoutfit to closet
//takodje remove clothes from outfit

//i na add outfit to closet success reducer preuzima outfit i dodaje ga u outfits

//da se initialized outfit kreira prilikom ucitavanja home i tad doda closetid, a
//na dugme add dodaje mu se odeca, i na dugme create outfit se poziva add outfit to closet
//i ponovo initialize outfit da bi mogao da se kreira novi