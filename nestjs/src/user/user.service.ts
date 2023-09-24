import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/typeorm';
import { Role } from 'src/auth/roles';
import { Repository, TypeORMError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async createUser(userToBeCreated : CreateUserDTO){
        try{
            const hashPassword = await bcrypt.hash(userToBeCreated.password, 10);
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
            console.log(newUser);
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
    
}
