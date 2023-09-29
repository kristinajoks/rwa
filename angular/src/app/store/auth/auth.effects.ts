import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "../../login/service/login.service";
import { SignupService } from "../../signup/service/signup.service";
import { loginUser, loginUserFailure, loginUserSuccess, signupUser, signupUserFailure, signupUserSuccess } from "./auth.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
    private loginService: LoginService,
    private signupService: SignupService
    ) {}
  
    jwtHelper = new JwtHelperService();

    loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(loginUser),
    switchMap((action) => this.loginService.login(action.user).pipe(
        map((jwt) => {
            const user = this.jwtHelper.decodeToken(jwt.access_token).user;
            return loginUserSuccess({user, token: jwt.access_token});
        }),
        catchError((error) => of(loginUserFailure({error})))
    ))
    ));
       
    
    signupUser$ = createEffect(() => this.actions$.pipe(
        ofType(signupUser),
        switchMap((action) => this.signupService.signup(action.user).pipe(
            map((jwt) => {
                const user = this.jwtHelper.decodeToken(jwt.access_token).user;
                return signupUserSuccess({user, token: jwt.access_token});
            }),
            catchError((error) => of(signupUserFailure({error})))
        ))
    ));
    
    
}
