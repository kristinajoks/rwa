import { createAction, props } from "@ngrx/store";
import { User } from "../../data/models/user";

export const loadUser = createAction('[User] Load User', props<{userId: number}>());
export const loadUserSuccess = createAction('[User] Load User Success', props<{user: User}>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{error: any}>());