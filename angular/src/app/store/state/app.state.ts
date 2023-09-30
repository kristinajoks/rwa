import { authReducer } from "../auth/auth.reducer";
import { userReducer } from "../users/user.reducer";

export const AppState = {
    auth: authReducer,
    user: userReducer
}
