import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createClothesDTO } from './clothes.dto';
import { ClothesService } from './clothes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer, diskStorage } from 'multer';
import RequestWithClothes from './requestWithClothes.interface';
import { Clothes } from '../typeorm';

@Controller('clothes')
export class ClothesController {
    constructor(private clothesService: ClothesService){}

    @Post() 
    @UseGuards(AuthGuard('jwt'))
    async createClothes(@Body() clothesToBeCreated: createClothesDTO){
        return await this.clothesService.createClothes(clothesToBeCreated);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getClothes(){
        return await this.clothesService.getClothes();
    }

    @Get('findbyid')
    @UseGuards(AuthGuard('jwt'))
    async findClothesById(@Body() id: number){
        return await this.clothesService.findClothesById(id);
    }

    @Post('avatar')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Body('clothesId') clothesId: number, @UploadedFile() file: Express.Multer.File){ 
 
        console.log("nest controller add avatar " + clothesId + file.originalname);

        return await this.clothesService.addAvatar(clothesId, file.buffer, file.originalname);
    }

}
