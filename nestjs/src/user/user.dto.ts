import { IsNotEmpty, IsEmail } from 'class-validator';

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

    //TODO dodati izbor uloge
}
