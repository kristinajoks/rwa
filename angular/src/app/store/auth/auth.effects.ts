import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "../../login/service/login.service";
import { SignupService } from "../../signup/service/signup.service";
import { loginUser, loginUserFailure, loginUserSuccess, logoutUser, logoutUserSuccess, signupUser, signupUserFailure, signupUserSuccess } from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
    private loginService: LoginService,
    private signupService: SignupService,
    private router: Router
    ) {}
  
    jwtHelper = new JwtHelperService();

    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(loginUser),
        switchMap((action) => this.loginService.login(action.user).pipe(
            tap( (jwt) => {
                console.log(jwt);
            }
            ),
            map((jwt) => {
                const userId = this.jwtHelper.decodeToken(jwt.access_token).userId;
                console.log('loginUser$' + userId);
                return loginUserSuccess({userId: userId, token: jwt.access_token});
            }),
            catchError((error) => {
                console.log(error);
                return of(loginUserFailure({error}));
            })
        ))
        ));
           

    signupUser$ = createEffect(() => this.actions$.pipe(
        ofType(signupUser),
        switchMap((action) => this.signupService.signup(action.user).pipe(
            map((jwt) => {
                const userId = this.jwtHelper.decodeToken(jwt.access_token).userId;
                return signupUserSuccess({userId, token: jwt.access_token});
            }),
            catchError((error) => of(signupUserFailure({error})))
        ))
    ));
   
    logoutUser$ = createEffect(() => this.actions$.pipe(
        ofType(logoutUser),
        switchMap(() => of(logoutUserSuccess())),
        catchError((error) => of(loginUserFailure(error)))
    ));
    
    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginUserSuccess),
        tap(() => this.router.navigate(['/home']))
    ), {dispatch: false});

    signupSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(signupUserSuccess),
        tap(() => this.router.navigate(['/home']))
    ), {dispatch: false});
}
