import { createAction, props } from "@ngrx/store";
import { User } from "../../data/models/user";
import { Role } from "../../data/enums/role";

export const loadUser = createAction('[User] Load User', props<{userId: number}>());
export const loadUserSuccess = createAction('[User] Load User Success', props<{user: User}>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{error: any}>());

export const changeUserRole = createAction('[User] Change User Role', props<{userId: number, role: Role}>());
export const changeUserRoleSuccess = createAction('[User] Change User Role Success', props<{user: User}>());
export const changeUserRoleFailure = createAction('[User] Change User Role Failure', props<{error: any}>());