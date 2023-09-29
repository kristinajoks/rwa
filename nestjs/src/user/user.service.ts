import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { Role } from '../auth/roles';
import { Repository, TypeORMError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm';
import * as argon from 'argon2';
import { type } from 'os';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async createUser(userToBeCreated : CreateUserDTO){
        try{
            console.log('user service nest ' + userToBeCreated.email +
             userToBeCreated.password + userToBeCreated.username);

            const hashPassword = await argon.hash(userToBeCreated.password, {type: argon.argon2id});
            const newUser : User = {
                id: 0,
                name: userToBeCreated.name,
                surname: userToBeCreated.surname,
                username: userToBeCreated.username,
                email: userToBeCreated.email,
                password: hashPassword,
                closet: null,
                role: Role.User,
            }

            console.log('user service nest' + newUser);
            
            await this.userRepository.save(newUser);
            delete newUser.password;
            return newUser;
        }
        catch(err){
            console.log(err);
            return new TypeORMError(err);
        }
    }

    async getUsers(){
        return await this.userRepository.find();
    }

    async findUserById(id: number){
        return await this.userRepository.findOneBy({id: id});
    }

    async findUserByUsername(username: string){
        return await this.userRepository.findOneBy({username: username});
    }
 
    async deleteUser(id: number){
        return await this.userRepository.delete(id);
    }

    //TODO updateUser nakon kreiranog UpdateUserDTO

}
