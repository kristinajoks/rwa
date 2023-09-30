import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { Closet, User } from '../typeorm';
import { CreateClosetDTO } from './closet.dto';

@Injectable()
export class ClosetService {
    constructor(
        @InjectRepository(Closet) private closetRepository: Repository<Closet>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async createCloset(closetToBeCreated: CreateClosetDTO){
        try{
            console.log(closetToBeCreated);

            const newCloset: Closet = {
                id: 0,
                owner: null,
                clothes: [],
                outfits: []
            }

            const ownerId = closetToBeCreated.ownerId;
            newCloset.owner = await this.userRepository.findOneBy({id: ownerId});
            
            // return newCloset;
            return await this.closetRepository.save(newCloset);
        }
        catch(err){
            return new TypeORMError(err);
        }
    }

    async getClosets(){
        return await this.closetRepository.find();
    }

    async findClosetById(id: number){
        return await this.closetRepository.findOneBy({id: id});
    }

    async updateCloset(id: number, closetToBeUpdated: CreateClosetDTO){
        const closet = await this.closetRepository.findOneBy({id: id});
        
        if(!closet){
            return null;
        }

        if(closetToBeUpdated.ownerId){
            const ownerId = closetToBeUpdated.ownerId;
            closet.owner = await this.userRepository.findOneBy({id: ownerId});
        }
        return await this.closetRepository.save(closet);
    }
    
}
