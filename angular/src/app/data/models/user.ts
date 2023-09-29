import { Role } from "../enums/role";
import { Closet } from "./closet";

export interface User {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    closet: Closet;
    role: Role;
}