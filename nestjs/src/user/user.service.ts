import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { Role } from '../auth/roles';
import { Repository, TypeORMError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Closet, User } from '../typeorm';
import * as argon from 'argon2';
import { type } from 'os';
import { ClosetService } from '../closet/closet.service';
import { CreateClosetDTO } from '../closet/closet.dto';
import { checkPrime } from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private closetService: ClosetService
    ) {}

    async createUser(userToBeCreated : CreateUserDTO){
        try{

            const hashPassword = await argon.hash(userToBeCreated.password, {type: argon.argon2id});
            const newUser : User = {
                id: 0,
                name: userToBeCreated.name,
                surname: userToBeCreated.surname,
                username: userToBeCreated.username,
                email: userToBeCreated.email,
                password: hashPassword,
                closet: new Closet(),
                role: userToBeCreated.role,
            }

            const createdUser = await this.userRepository.save(newUser); //obavezno
 
            delete newUser.password;
            return newUser;
        }
        catch(err){
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

    async updateUserRole(id: number, role: Role){
        const user = await this.findUserById(id);
        user.role = role;
        return await this.userRepository.save(user);
    }
}
