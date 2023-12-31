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
            const createdUser = await this.userService.createUser(newUser);
            
            if (createdUser == null || createdUser == undefined || createdUser instanceof TypeORMError) {
                throw new Error("User could not be created");
            }
            return await this.login(createdUser);
        }
        catch(err){
            return new HttpException(err, 500);
        }
    }

    async validateUser(username:string, password: string) {

        const user = await this.userService.findUserByUsername(username);        
        
        if (user && await argon.verify(user.password, password)) {
            const {password, ...result} = user;
            return result;
        }
        
        return null;
    }

    async login(user: UserNoPassword){
        const payload = {userId: user.id, role: user.role};

        return {
            access_token: this.jwtService.sign(payload, {secret: process.env.JWT_SECRET}),
        };
    }

}