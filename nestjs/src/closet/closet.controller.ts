import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClosetService } from './closet.service';
import { CreateClosetDTO } from './closet.dto';

@Controller('closet')
export class ClosetController {
    constructor(private service: ClosetService){}

    @Post('create')
    createCloset(@Body() createCloset: CreateClosetDTO){
        console.log(createCloset);
        return this.service.createCloset(createCloset);
    }

    @Get()
    getClosets(){
        return this.service.getClosets();
    }

    @Get('findbyid')
    findClosetById(@Query("id") id: number) {
        return this.service.findClosetById(id);
    }

    @Put('id')
    updateCloset(@Param('id') id: number,@Body() updateCloset: CreateClosetDTO){
        return this.service.updateCloset(id, updateCloset);
    }
}
