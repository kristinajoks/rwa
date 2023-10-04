import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OutfitService } from './outfit.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('outfit')
export class OutfitController {

    constructor(private service: OutfitService){}

    @Post(':closetId')
    @UseGuards(AuthGuard('jwt'))
    async createOutfit(@Param('closetId') closetId: number, @Body() clothesIds: number[]){
        try{
            return await this.service.createOutfit(closetId, clothesIds);
        }
        catch(err){
            return err;
        }
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getOutfits(){
        try{
            return await this.service.getOutfits();
        }
        catch(err){
            return err;
        }
    }

}
