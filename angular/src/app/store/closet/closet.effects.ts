import { Injectable } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { ClothesService } from "../../clothes/service/clothes.service";
import { switchMap, map, catchError, of, tap, mergeMap, withLatestFrom } from "rxjs";
import { addClothesToCloset, addClothesSuccess, addClothesFailure, loadClothesFromCloset, loadClothesFromClosetFailure, loadClothesFromClosetSuccess, loadCloset, loadClosetSuccess, loadClosetFailure} from "./closet.actions";
import { Clothes } from "../../data/models/clothes";
import { loadUserSuccess } from "../users/user.actions";
import { ClosetService } from "../../closet/service/closet.service";
import { Closet } from "../../data/models/closet";
import { ImageService } from "../../image.service";
import { DatabaseFile } from "../../data/models/databaseFile";
import { Store } from "@ngrx/store";
import { selectClosetId } from "./closet.selector";

@Injectable()
export class ClosetEffects {
    constructor(private actions$: Actions, 
        private clothesService: ClothesService,
        private closetService: ClosetService,
        private store: Store
        ) 
    { }

    addClothes$ = createEffect(() => this.actions$.pipe(
        ofType(addClothesToCloset),
        switchMap((action) => this.clothesService.createClothesWithAvatar(action.clothes)
        .pipe(
            tap((clothes) => {
                console.log(clothes);
            }),
            map((clothes) => {
                return addClothesSuccess({clothes: clothes as Clothes});
            }),
            catchError((error) => of(addClothesFailure({error})))
        ))
    ));

    addClothesSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(addClothesSuccess),
        switchMap(() => this.store.select(selectClosetId).pipe(
            map((closetId) => {
                return loadClothesFromCloset({id: closetId});
            })
        ))
    ));


    loadClothesFromCloset$ = createEffect(() => this.actions$.pipe(
        ofType(loadClothesFromCloset),
        switchMap((action) => this.closetService.getClothesFromCloset(action.id).pipe(
            map((clothes) => {
                return loadClothesFromClosetSuccess({clothes: clothes as Clothes[]});
            }),
            catchError((error) => of(loadClothesFromClosetFailure({error})))
        ))
    ));

    loadUserSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loadUserSuccess),
        map((action) => loadCloset({id: action.user.closet.id}))
    ));

    loadCloset$ = createEffect(() => this.actions$.pipe(
        ofType(loadCloset),
        switchMap((action) => this.closetService.getClosetById(action.id).pipe(
            map((closet) => {
                return loadClosetSuccess({closet: closet as Closet});
            }),
            catchError((error) => of(loadClosetFailure({error})))
        ))
    )); 

    loadClosetSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loadClosetSuccess),
        map((action) => loadClothesFromCloset({id: action.closet.id}))
    ));

}