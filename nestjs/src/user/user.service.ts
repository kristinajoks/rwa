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

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private closetService: ClosetService
    ) {}

    async createUser(userToBeCreated : CreateUserDTO){
        try{
            // CHANGE THIS
            // const closetToBeCreated: CreateClosetDTO = {
            //     ownerId: 0,
            // }
            // const newCloset = await this.closetService.createCloset(closetToBeCreated);

            // if(!newCloset){
            //     return null;
            // }

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

            //
            // newCloset.owner = newUser;

            const createdUser = await this.userRepository.save(newUser);
            const closetToBeCreated: CreateClosetDTO = {
                ownerId: createdUser.id,
            }

            const newCloset = await this.closetService.createCloset(closetToBeCreated);

            if(!newCloset){
                return null;
            }

            createdUser.closet = newCloset as Closet;
            
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

}
