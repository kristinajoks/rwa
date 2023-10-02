import { authReducer } from "../auth/auth.reducer";
import { closetReducer } from "../closet/closet.reducer";
import { userReducer } from "../users/user.reducer";

export const AppState = {
    auth: authReducer,
    user: userReducer,
    closet: closetReducer
}
