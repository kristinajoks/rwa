import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Closet, Clothes, Outfit } from '../typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { createClothesDTO } from './clothes.dto';
import { ClothesOccasion, ClothesPlacement, ClothesType, getOccasionFromString, getPlacementFromString, getTypeFromString } from '../shared/enums';

@Injectable()
export class ClothesService {
    constructor(@InjectRepository(Clothes) private clothesRepository: Repository<Clothes>,
    @InjectRepository(Closet) private closetRepository: Repository<Closet>){}


    async createClothes(clothesToBeCreated: createClothesDTO){
        try{
            const newCloset = await this.closetRepository.findOneBy({id: clothesToBeCreated.closetId});
            
            const newClothesPlacement : ClothesPlacement = getPlacementFromString(clothesToBeCreated.placement);
            const newClothesType : ClothesType = getTypeFromString(clothesToBeCreated.type);
            const newClothesOccasion : ClothesOccasion = getOccasionFromString(clothesToBeCreated.occasion);

            const newClothes = await this.clothesRepository.save({
                id: 0,
                color: clothesToBeCreated.color,
                placement: newClothesPlacement,
                type: newClothesType,
                occasion: newClothesOccasion,
                src: clothesToBeCreated.src,
                isForSale: clothesToBeCreated.isForSale,
                isSold: clothesToBeCreated.isSold,
                isFavorite: clothesToBeCreated.isFavorite,
                closet: newCloset,
                outfits: []
            });

        }
        catch(err){
            return new TypeORMError(err);
        }
    }

    async getClothes(){
        return await this.clothesRepository.find({relations: ['closet', 'outfits']});
    }

    async findClothesById(id: number){
        return await this.clothesRepository.findOneBy({id: id}); //mozda treba dodati relations ali baca error
    }

}
