import { Role } from "../../data/enums/role";

export interface UserState {
    id: number | null;
    name: string | null;
    surname: string | null;
    username: string | null;
    email: string | null;
    closetId: number ; 
    role: Role | null;
    error: any | null;
  }
  
  export const initialState: UserState = {
    id: null,
    name: null,
    surname: null,
    username: null,
    email: null,
    closetId: -1,
    role: null,
    error: null
  };
  