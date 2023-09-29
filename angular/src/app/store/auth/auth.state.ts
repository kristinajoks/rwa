
export interface AuthState {
    userId: number | null;
    token: string | null;
    isAuthenticated: boolean;
    errorMessage: string | null;
}

export const initialState: AuthState = {
    userId: null,
    token: null,
    isAuthenticated: false,
    errorMessage: null
};

