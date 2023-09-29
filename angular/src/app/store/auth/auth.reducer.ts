import { createReducer, on } from "@ngrx/store";
import {initialState} from "./auth.state";
import { loginUserFailure, loginUserSuccess, logoutUserFailure, logoutUserSuccess, signupUserFailure, signupUserSuccess } from "./auth.actions";

export const authReducer = createReducer(
    initialState,
    on(loginUserSuccess, (state, { user, token }) => ({
        ...state,
        user,
        token,
        isAuthenticated: true,
        error: null,
      })),
      on(loginUserFailure, (state, { error }) => ({
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error,
      })),
      on(signupUserSuccess, (state, { user, token }) => ({
        ...state,
        user,
        token,
        isAuthenticated: true,
        error: null,
      })),
      on(signupUserFailure, (state, { error }) => ({
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error,
      })),
      on(logoutUserSuccess, (state) => ({
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      })),
        on(logoutUserFailure, (state, { error }) => ({
            ...state,
            error,
        }))
    );

