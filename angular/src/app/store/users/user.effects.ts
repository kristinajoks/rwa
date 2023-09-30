import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../user/service/user.service";
import { loadUser, loadUserFailure, loadUserSuccess } from "./user.actions";
import { switchMap, map, catchError, of } from "rxjs";
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
                // const userToSend: User = {
                //     id: 0,
                //     name: "",
                //     surname: "",
                //     username: "",
                //     email: "",
                //     password: "",
                //     closet: undefined,
                //     role: User
                // };
                console.log(user);
                return loadUserSuccess({user: user as User});
            }),
            catchError((error) => of(loadUserFailure({error})))
        ))
    ));

}