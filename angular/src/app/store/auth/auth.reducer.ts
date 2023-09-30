import { createReducer, on } from "@ngrx/store";
import {initialState} from "./auth.state";
import { loginUserFailure, loginUserSuccess, logoutUserFailure, logoutUserSuccess, signupUserFailure, signupUserSuccess } from "./auth.actions";

export const authReducer = createReducer(
    initialState,
    on(loginUserSuccess, (state, { userId, token }) => ({
        ...state,
        userId,
        token,
        isAuthenticated: true,
        error: null,
      })),
      on(loginUserFailure, (state, { error }) => ({
        ...state,
        userId: -1,
        token: null,
        isAuthenticated: false,
        error,
      })),
      on(signupUserSuccess, (state, { userId, token }) => ({
        ...state,
        userId,
        token,
        isAuthenticated: true,
        error: null,
      })),
      on(signupUserFailure, (state, { error }) => ({
        ...state,
        userId: -1,
        token: null,
        isAuthenticated: false,
        error,
      })),
      on(logoutUserSuccess, (state) => ({
        ...state,
        userId: -1,
        token: null,
        isAuthenticated: false,
        error: null,
      })),
        on(logoutUserFailure, (state, { error }) => ({
            ...state,
            error,
        }))
    );

