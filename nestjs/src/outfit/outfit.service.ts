import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Closet, Outfit } from '../typeorm';
import { Repository } from 'typeorm';
import { ClothesService } from '../clothes/clothes.service';

@Injectable()
export class OutfitService {
    constructor(
        @InjectRepository(Outfit) private outfitRepository: Repository<Outfit>,
        @InjectRepository(Closet) private closetRepository: Repository<Closet>,
        private clothesService: ClothesService
    ) {}

    async createOutfit(closetId: number, clothesIds: number[]){
        const closet = await this.closetRepository.findOneBy({id: closetId});

        if(!closet){
            throw new NotFoundException('Closet not found');
        }

        const clothes = await this.clothesService.findClothesByIds(clothesIds);

        if(!clothes || clothes.length === 0){
            throw new NotFoundException('Clothes not found');
        }

        const newOutfit = new Outfit();
        newOutfit.closet = closet;
        newOutfit.clothes = clothes;

        return await this.outfitRepository.save(newOutfit);
    }

    async getOutfits(){
        return await this.outfitRepository.find({relations: ['clothes', 'closet']});
    }
}
