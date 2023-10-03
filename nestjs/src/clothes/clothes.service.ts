import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Closet, Clothes, Outfit } from '../typeorm';
import { Connection, In, Repository, TypeORMError } from 'typeorm';
import { createClothesDTO } from './clothes.dto';
import { ClothesOccasion, ClothesPlacement, ClothesType, getOccasionFromString, getPlacementFromString, getTypeFromString } from '../shared/enums';
import { DatabaseFilesService } from '../database-files/database-files.service';

@Injectable()
export class ClothesService {
    constructor(@InjectRepository(Clothes) private clothesRepository: Repository<Clothes>,
    @InjectRepository(Closet) private closetRepository: Repository<Closet>,
    private readonly databaseFilesService: DatabaseFilesService,
    private conneciton: Connection){}


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
                isForSale: clothesToBeCreated.isForSale,
                isSold: clothesToBeCreated.isSold,
                isFavorite: clothesToBeCreated.isFavorite,
                closet: newCloset,
                outfits: []
            });

            return newClothes;

        }
        catch(err){
            return new TypeORMError(err);
        }
    }

    async getClothes(){
        return await this.clothesRepository.find({relations: ['closet', 'outfits']});
    }

    async findClothesById(id: number){
        return await this.clothesRepository.findOneBy({id: id}); 
    }

    async addAvatar(clothesId: number, imageBuffer: Buffer, filename: string){

        const queryRunner = this.conneciton.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try{
            const clothes = await this.clothesRepository.findOneBy({id: clothesId});
        
            const currentAvatarId = clothes.avatarId;
            const avatar = await this.databaseFilesService.uploadDatabaseFileWithQueryBuilder(imageBuffer, filename, queryRunner);

            const update = await queryRunner.manager.update(Clothes, {id: clothesId}, {avatarId: avatar.id});

            if(currentAvatarId){
                await this.databaseFilesService.deleteFileWithQueryBuilder(currentAvatarId, queryRunner);
            }

            await queryRunner.commitTransaction();

            return avatar;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException();
        }
        finally{
            await queryRunner.release();
        }
    }

}
