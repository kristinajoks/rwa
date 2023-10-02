import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ClothesService } from "../../clothes/service/clothes.service";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { addClothesToCloset, addClothesSuccess, addClothesFailure, loadClothesFromCloset, loadClothesFromClosetFailure, loadClothesFromClosetSuccess, loadCloset, loadClosetSuccess, loadClosetFailure } from "./closet.actions";
import { Clothes } from "../../data/models/clothes";
import { loadUserSuccess } from "../users/user.actions";
import { ClosetService } from "../../closet/service/closet.service";
import { Closet } from "../../data/models/closet";

@Injectable()
export class ClosetEffects {
    constructor(private actions$: Actions, 
        private clothesService: ClothesService,
        private closetService: ClosetService) 
    { }

    addClothes$ = createEffect(() => this.actions$.pipe(
        ofType(addClothesToCloset),
        switchMap((action) => this.clothesService.createClothes(action.clothes).pipe(
            map((clothes) => {
                return addClothesSuccess({clothes: clothes as Clothes});
            }),
            catchError((error) => of(addClothesFailure({error})))
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