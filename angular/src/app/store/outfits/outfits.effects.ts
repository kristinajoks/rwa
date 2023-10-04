import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { OutfitService } from "../../outfit/outfit.service";
import { addClothesToOutfit, addClothesToOutfitFailure, addClothesToOutfitSuccess, getOutfits, getOutfitsFailure, getOutfitsSuccess, initializeOutfit } from "./outfits.actions";
import { switchMap, map, catchError, of } from "rxjs";
import { Outfit } from "../../data/models/outfit";
import { ClothesService } from "../../clothes/service/clothes.service";
import { Clothes } from "../../data/models/clothes";
import { addOutfitSuccess } from "../closet/closet.actions";
import { selectClosetId } from "../users/user.selector";

@Injectable()
export class OutfitEffects {
    constructor(private actions$ : Actions,
        private store: Store,
        private outfitService: OutfitService,
        private clothesService: ClothesService,) { }

    getOutfits$ = createEffect(() => this.actions$.pipe(
        ofType(getOutfits),
        switchMap(() => this.outfitService.getOutfits().pipe(
            map((outfits) => {
                return getOutfitsSuccess({outfits: outfits as Outfit[]});
            }),
            catchError((error) => of(getOutfitsFailure({error})))
        ))
    ));

    addClothesToOutfit$ = createEffect(() => this.actions$.pipe(
        ofType(addClothesToOutfit),
        switchMap((action) => this.clothesService.getClothesById(action.clothesId).pipe(
            map((clothes) => {
                const clothesObj = clothes as Clothes;
                if(clothesObj.avatarId)
                    return addClothesToOutfitSuccess({clothes: clothesObj});
                else
                    return addClothesToOutfitFailure({error: 'Clothes does not have avatar'});
            }),
            catchError((error) => of(addClothesToOutfitFailure({error})))
        ))
    ));

    addOutfitSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(addOutfitSuccess),
        switchMap((action) => this.store.select(selectClosetId).pipe(
            map((closetId) => {
                return initializeOutfit({closetId: closetId});
            })
        ))
    ));

}