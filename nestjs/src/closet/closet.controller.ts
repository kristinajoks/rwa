import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClosetService } from './closet.service';
import { CreateClosetDTO } from './closet.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('closet')
export class ClosetController {
    constructor(private service: ClosetService){}

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    createCloset(@Body() createCloset: CreateClosetDTO){
        try{
            return this.service.createCloset(createCloset);
        }
        catch(err){
            return err;
        }
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getClosets(){
        try{
            return this.service.getClosets();
        }
        catch(err){
            return err;
        }
    }

    @Get('findbyid')
    @UseGuards(AuthGuard('jwt'))
    findClosetById(@Query("id") id: number) {
        try{
            return this.service.findClosetById(id);
        }
        catch(err){
            return err;
        }
    }

    @Put('id')
    @UseGuards(AuthGuard('jwt'))
    updateCloset(@Param('id') id: number,@Body() updateCloset: CreateClosetDTO){
        try{
            return this.service.updateCloset(id, updateCloset);
        }
        catch(err){
            return err;
        }
    }

    @Get('getclothes')
    @UseGuards(AuthGuard('jwt'))
    getClothesFromCloset(@Query('id') id: number){
        try{
            return this.service.getClothesFromCloset(id);
        }
        catch(err){
            return err;
        }
    }
}
