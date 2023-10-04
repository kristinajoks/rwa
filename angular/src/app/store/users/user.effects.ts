import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../user/service/user.service";
import { changeUserRole, changeUserRoleFailure, changeUserRoleSuccess, loadAllUsers, loadAllUsersFailure, loadAllUsersSuccess, loadUser, loadUserFailure, loadUserSuccess } from "./user.actions";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { User } from "../../data/models/user";

@Injectable()
export class UserEffects{
    constructor(private actions$: Actions,
        private userService: UserService,
        private router: Router
        ) {}

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(loadUser),
        switchMap((action) => this.userService.getUserById(action.userId).pipe(
            map((user) =>  {                
                return loadUserSuccess({user: user as User});
            }),
            catchError((error) => of(loadUserFailure({error})))
        ))
    ));

    changeUserRole$ = createEffect(() => this.actions$.pipe(
        ofType(changeUserRole),
        switchMap((action) => this.userService.changeUserRole(action.userId, action.role).pipe(
            map((user) =>  {                
                return changeUserRoleSuccess({user: user as User});
            }),
            catchError((error) => of(changeUserRoleFailure({error})))
        ))
    ));

    chaneUserRoleSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(changeUserRoleSuccess),
        tap((action) => {
            this.router.navigate(['/shop']); 
        })
    ), { dispatch: false });

    loadAllUsers$ = createEffect(() => this.actions$.pipe(
        ofType(loadAllUsers),
        switchMap(() => this.userService.getAllUsers().pipe(
            map((users) =>  {                
                return loadAllUsersSuccess({users: users as User[]});
            }),
            catchError((error) => of(loadAllUsersFailure({error})))
        ))
    ));

}