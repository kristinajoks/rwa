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

        console.log("database files controller " + file.filename);

        const stream = Readable.from(file.data);
        
        response.set({
            'Content-Disposition': `inline; filename=${file.filename}`,
            'Content-Type': 'image/png',
        })

        response.status(200);
        stream.pipe(response);

        // return new StreamableFile(stream);
        return file;
    }
}

