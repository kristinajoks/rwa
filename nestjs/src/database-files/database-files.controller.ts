import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Res, StreamableFile, UseInterceptors } from '@nestjs/common';
import { Readable } from 'typeorm/platform/PlatformTools';
import { DatabaseFilesService } from './database-files.service';

@Controller('database-files')
@UseInterceptors(ClassSerializerInterceptor)
export class DatabaseFilesController {
    constructor(private databaseFilesService: DatabaseFilesService){}

    @Get()
    async getDatabaseFiles(){
        return await this.databaseFilesService.getFiles();
    }

    @Get(':id')
    async getDatabaseFileById(@Res() response, @Param('id', ParseIntPipe) id: number){
        const file = await this.databaseFilesService.getFileById(id);

        response.setHeader('Content-Type', 'application/json');
        response.send(file);
    }
}

