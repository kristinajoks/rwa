import { IsNotEmpty, IsEmail } from 'class-validator';
import { Role } from '../auth/roles';

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    surname: string;
    
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: Role;

    //TODO dodati izbor uloge
}
