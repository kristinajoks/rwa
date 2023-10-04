import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { getClothesInTheStore } from "./clothesInStore.actions";
import { User } from "../../data/models/user";
import { loadClothesFromCloset, loadClothesFromClosetSuccess } from "../closet/closet.actions";
import { UserService } from "../../user/service/user.service";
import { ClosetService } from "../../closet/service/closet.service";
import { DatabaseFileService } from "../../database-file/service/database-file.service";
import { loadAllUsersSuccess, loadUserSuccess } from "../users/user.actions";
import { Clothes } from "../../data/models/clothes";

//well ispada nepotrebno
@Injectable()
export class ClothesInStoreEffects{
    constructor(private actions$: Actions,
        private userService: UserService,
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
        switchMap((action) => action.users.map((user) => loadClothesFromCloset({id: user.closet.id})))
    ));


    // loadClothesFromCloset$ = createEffect(() => this.actions$.pipe(
    //     ofType(loadClothesFromCloset),
    //     switchMap((action)=> this.closetService.getClothesFromCloset(action.id).pipe(
    //         map((clothes) => loadClothesFromClosetSuccess({clothes: clothes as Clothes[]})),
    //         catchError((error) => of(error))
    //     ))
    // ));

    // loadDatabaseFile$ = createEffect(() => this.actions$.pipe(
    //     ofType(loadDatabaseFile),
    //     switchMap((action) => this.databaseFileService.getDatabaseFileById(action.id).pipe(
    //         map((databaseFile) => [
    //             loadDatabaseFileSuccess({databaseFile: databaseFile as FileDto})
    //         ]),
    //         catchError((error) => of(error))
    //     ))
    // ));
}