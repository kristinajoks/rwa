import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createClothesDTO } from './clothes.dto';
import { ClothesService } from './clothes.service';

@Controller('clothes')
export class ClothesController {
    constructor(private clothesService: ClothesService){}

    @Post() 
    @UseGuards(AuthGuard('jwt'))
    async createClothes(@Body() clothesToBeCreated: createClothesDTO){
        console.log('clothes service nest' + clothesToBeCreated);
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
}
