import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    //TODO dodati izbor uloge
}
