import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Res, StreamableFile, UseInterceptors } from '@nestjs/common';
import { Readable } from 'typeorm/platform/PlatformTools';
import { DatabaseFilesService } from './database-files.service';

@Controller('database-files')
@UseInterceptors(ClassSerializerInterceptor)
export class DatabaseFilesController {
    constructor(private databaseFilesService: DatabaseFilesService){}

    @Get()
    async getDatabaseFiles(){
        try{
            return await this.databaseFilesService.getFiles();
        }
        catch(err){
            return err;
        }
    }

    @Get(':id')
    async getDatabaseFileById(@Res() response, @Param('id', ParseIntPipe) id: number){
        try{
            const file = await this.databaseFilesService.getFileById(id);
            
            response.setHeader('Content-Type', 'application/json');
            response.send(file);
        }
        catch(err){
            return err;
        }
    }
}

