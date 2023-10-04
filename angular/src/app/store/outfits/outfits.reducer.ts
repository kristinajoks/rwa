import { createReducer, on } from "@ngrx/store";
import { initialState } from "./outfits.state";
import { addClothesToOutfitSuccess, getOutfitsSuccess, initializeOutfit, removeClothesFromOutfit } from "./outfits.actions";
import { ClothesOutfitDTO, OutfitDTO } from "../../data/dtos/outfit.dto";

export const outfitReducer = createReducer(
    initialState,
    on(getOutfitsSuccess, (state, {outfits}) => {
        let outfitDTOs : OutfitDTO[] = [];

        
        outfits.forEach((outfit) => {
                if(state.outfitToBeAdded !== null && state.outfitToBeAdded?.closetId !== undefined 
                     && state.outfitToBeAdded?.closetId !== null){
                      
                    let clothesArray: ClothesOutfitDTO[] = [];
                    let clothesDto: ClothesOutfitDTO ;
                    
                    outfit.clothes.forEach((clothe) => {
                        clothesDto = {
                            clothesId: clothe.id,
                            src:`${clothe.type}/${clothe.color}}.png`
                        };
                        clothesArray.push(clothesDto);
                    });

                    const outfitDTO : OutfitDTO = {
                        id: outfit.id,
                        closetId: state.outfitToBeAdded.closetId,
                        clothes: clothesArray
                    }

                    outfitDTOs.push(outfitDTO);
                }
            });
        return {
            ...state,
            outfitDTOs,
            error: null,
        };
    }),
    on(initializeOutfit, (state, {closetId}) => {

        const outfitDTO : OutfitDTO = {
            id: -1,
            closetId: closetId,
            clothes: []
        };

        return {
            ...state,
            outfitToBeAdded: outfitDTO,
            error: null,
        };
    }),
    on(addClothesToOutfitSuccess, (state, {clothes}) => {
        if(state.outfitToBeAdded !== null){
            const newClothes = {
                clothesId: clothes.id,
                src: `${clothes.type}/${clothes.color}.png`,
            };
            const outfitToBeAdded = {
                ...state.outfitToBeAdded,
                clothes: [...state.outfitToBeAdded.clothes, newClothes],
            };
            return {
                ...state,
                outfitToBeAdded,
                error: null,
            };
        }
        else{
            return {
                ...state,
                error: null,
            };
        }
    }),
    on(removeClothesFromOutfit, (state, {clothesId}) => {
        if(state.outfitToBeAdded !== null){
            const outfitToBeAdded = {
                ...state.outfitToBeAdded,
                clothes: [...state.outfitToBeAdded.clothes.filter((item) => item.clothesId !== clothesId)],
            };
            return {
                ...state,
                outfitToBeAdded,
                error: null,
            };
        }
        else{
            return {
                ...state,
                error: null,
            };
        }
    }),
);