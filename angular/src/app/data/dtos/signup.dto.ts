import { Role } from "../enums/role";

export interface SignupDTO {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    role: Role;
}