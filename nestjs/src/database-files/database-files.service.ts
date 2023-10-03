import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import DatabaseFile from '../typeorm/databaseFile.entity';

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
        return file;
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