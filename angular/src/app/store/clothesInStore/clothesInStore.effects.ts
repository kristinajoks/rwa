import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";
import { getClothesInTheStore, loadClothesFromClosetForSale, loadClothesFromClosetForSaleFailure, loadClothesFromClosetForSaleSuccess } from "./clothesInStore.actions";
import { User } from "../../data/models/user";
import { loadClothesFromCloset, loadClothesFromClosetSuccess } from "../closet/closet.actions";
import { UserService } from "../../user/service/user.service";
import { ClosetService } from "../../closet/service/closet.service";
import { DatabaseFileService } from "../../database-file/service/database-file.service";
import { loadAllUsersSuccess, loadUserSuccess } from "../users/user.actions";
import { Clothes } from "../../data/models/clothes";
import { Role } from "../../data/enums/role";
import { Store } from "@ngrx/store";
import { selectUserId } from "../auth/auth.selector";

//well ispada nepotrebno
@Injectable()
export class ClothesInStoreEffects{
    constructor(private actions$: Actions,
        private userService: UserService,
        private store: Store,
        private closetService: ClosetService,
        private databaseFileService: DatabaseFileService) {}

    getClothesInTheStore$ = createEffect(() => this.actions$.pipe(
        ofType(getClothesInTheStore),
        switchMap((action) => this.userService.getUserById(action.userId).pipe(
            mergeMap((user ) => [
                loadUserSuccess({user: user as User}),
                loadClothesFromCloset({id: (user as User).closet.id}),
            ]),
            catchError((error) => of(error))
        ))
    ));

    loadAllUsersSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loadAllUsersSuccess), //umm u sure?
        withLatestFrom(this.store.select(selectUserId)),
        tap(([action, currentId]) => console.log(action, currentId)),
        switchMap(([action, currentId]) => action.users
        .filter((user) => user.role === Role.Seller && user.id !== currentId)
        .map((user) => loadClothesFromClosetForSale({id: user.closet.id})
        )),
        tap((action) => console.log(action))       
    ));

    
    loadClothesFromCLosetForSale$ = createEffect(() => this.actions$.pipe(
        ofType(loadClothesFromClosetForSale),
        switchMap((action) => this.closetService.getClothesFromCloset(action.id).pipe(
            map((clothes) => loadClothesFromClosetForSaleSuccess({clothes: clothes as Clothes[]})),
            catchError((error) => of(loadClothesFromClosetForSaleFailure({error})))
        ))
    ));

}