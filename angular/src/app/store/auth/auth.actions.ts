import { createAction, props } from "@ngrx/store";
import { LoginDTO } from "../../data/dtos/login.dto";
import { User } from "../../data/models/user";
import { SignupDTO } from "../../data/dtos/signup.dto";

export const loginUser = createAction('[Auth] Login User', props<{user: LoginDTO}>());
export const loginUserSuccess = createAction('[Auth] Login User Success', props<{user: User, token: string}>());
export const loginUserFailure = createAction('[Auth] Login User Failure', props<{error: any}>());

export const signupUser = createAction('[Auth] Signup User', props<{user: SignupDTO}>());
export const signupUserSuccess = createAction('[Auth] Signup User Success', props<{user: User, token: string}>());
export const signupUserFailure = createAction('[Auth] Signup User Failure', props<{error: any}>());

export const logoutUser = createAction('[Auth] Logout User');
export const logoutUserSuccess = createAction('[Auth] Logout User Success');
export const logoutUserFailure = createAction('[Auth] Logout User Failure', props<{error: any}>());