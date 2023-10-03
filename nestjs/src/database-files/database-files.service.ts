import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import DatabaseFile from '../typeorm/databaseFile.entity';
import { Readable } from 'typeorm/platform/PlatformTools';

@Injectable()
export class DatabaseFilesService {
    constructor(
        @InjectRepository(DatabaseFile)
        private databaseFileRepository: Repository<DatabaseFile>,
    ){}

    async uploadDatabaseFileWithQueryBuilder(imageBuffer: Buffer, filename: string, queryRunner: QueryRunner){
        const newFile = await queryRunner.manager.create(DatabaseFile, {
            filename, 
            data: imageBuffer
        })
        await queryRunner.manager.save(DatabaseFile, newFile);
        return newFile;
    }

    async getFileById(fileId: number){
        const file = await this.databaseFileRepository.findOneBy({id: fileId});
        if(!file){
            throw new NotFoundException();
        }

        const fileData = Readable.from(file.data);
        const streamableData = new StreamableFile(fileData);
        // return file;
        return {id: file.id, filename: file.filename, data: streamableData};
    }

    async deleteFileWithQueryBuilder(fileId: number, queryRunner: QueryRunner){
        const deleteResponse = await queryRunner.manager.delete(DatabaseFile, {id: fileId});
        if(!deleteResponse.affected){
            throw new NotFoundException();
        }
    }

    async getFiles(){
        return await this.databaseFileRepository.find();
    }

}
export default DatabaseFilesService;