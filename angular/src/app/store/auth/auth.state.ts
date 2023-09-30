
export interface AuthState {
    userId: number;
    token: string | null;
    isAuthenticated: boolean;
    error: any | null;
}

export const initialState: AuthState = {
    userId: -1,
    token: null,
    isAuthenticated: false,
    error: null
};

