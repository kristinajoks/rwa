import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/typeorm';
import { CreateUserDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { TypeORMError } from 'typeorm';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';

type UserNoPassword = Omit<User, "passwordHash">;

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {
    }

    async signup(newUser: CreateUserDTO){
        try{
            console.log('auth service nest ' + newUser.email + 
            newUser.password + newUser.username); 

            const createdUser = await this.userService.createUser(newUser);
            if (createdUser == null || createdUser == undefined || createdUser instanceof TypeORMError) {
                throw new Error("User could not be created");
            }
            return await this.login(createdUser);
        }
        catch(err){
            console.log(err);
            return new HttpException(err, 500);
        }
    }

    async validateUser(username:string, password: string) {
        console.log("Auth service validating");
        const user = await this.userService.findUserByUsername(username);
        
        console.log("User found");
        console.log(user + " " + password);
        
        if (user && await argon.verify(user.password, password)) {
            const {password, ...result} = user;
            return result;
        }
        console.log("validation failed");
        return null;
    }

    async login(user: UserNoPassword){
        const payload = {userId: user.id, role: user.role};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}