import { authReducer } from "../auth/auth.reducer";
import { closetReducer } from "../closet/closet.reducer";
import { clothesInStoreReducer } from "../clothesInStore/clothesInStore.reducer";
import { databaseFileReducer } from "../databaseFile/databaseFile.reducer";
import { userReducer } from "../users/user.reducer";

export const AppState = {
    auth: authReducer,
    user: userReducer,
    closet: closetReducer,
    databaseFile: databaseFileReducer,
    clothesInStore: clothesInStoreReducer
}
