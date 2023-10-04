import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
        try{
            return await this.clothesService.createClothes(clothesToBeCreated);
        }
        catch(err){
            return err;
        }
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getClothes(){
        try{
            return await this.clothesService.getClothes();
        }
        catch(err){
            return err;
        }
    }

    @Get('findbyid/:id')
    @UseGuards(AuthGuard('jwt'))
    async findClothesById(@Param('id') id: number){
        try{
            return await this.clothesService.findClothesById(id);
        }
        catch(err){
            return err;
        }
    }

    @Post('avatar')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Body('clothesId') clothesId: number, @UploadedFile() file: Express.Multer.File){ 
        try{
            return await this.clothesService.addAvatar(clothesId, file.buffer, file.originalname);
        }
        catch(err){
            return err;
        }
    }

    @Put(':id/updateIsForSale')
    @UseGuards(AuthGuard('jwt'))
    async updateIsForSale(@Param('id') id: number){
        try{
            return await this.clothesService.updateClothesForSale(id);
        }
        catch(err){
            return err;
        }
    }
}
