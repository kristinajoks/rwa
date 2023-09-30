
export interface AuthState {
    userId: number | null;
    token: string | null;
    isAuthenticated: boolean;
    error: any | null;
}

export const initialState: AuthState = {
    userId: null,
    token: null,
    isAuthenticated: false,
    error: null
};

