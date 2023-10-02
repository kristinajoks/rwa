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
        return this.service.createCloset(createCloset);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    getClosets(){
        return this.service.getClosets();
    }

    @Get('findbyid')
    @UseGuards(AuthGuard('jwt'))
    findClosetById(@Query("id") id: number) {
        return this.service.findClosetById(id);
    }

    @Put('id')
    @UseGuards(AuthGuard('jwt'))
    updateCloset(@Param('id') id: number,@Body() updateCloset: CreateClosetDTO){
        return this.service.updateCloset(id, updateCloset);
    }

    @Get('getclothes')
    @UseGuards(AuthGuard('jwt'))
    getClothesFromCloset(@Query('id') id: number){
        return this.service.getClothesFromCloset(id);
    }
}
