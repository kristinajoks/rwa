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
            const newCloset = new Closet();

            const ownerId = closetToBeCreated.ownerId;
            newCloset.owner = await this.userRepository.findOneBy({id: ownerId});
            
            return await this.closetRepository.save(newCloset);
        }
        catch(err){
            return new TypeORMError(err);
        }
    }

    async getClosets(){
        return await this.closetRepository.find({relations: ['clothes']});
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

    async getClothesFromCloset(id: number){
        const closet = await this.closetRepository.createQueryBuilder('closet')
        .leftJoinAndSelect('closet.clothes', 'clothes')
        .where('closet.id = :id', {id: id})
        .getOne();

        return closet.clothes;
    }
    
}
