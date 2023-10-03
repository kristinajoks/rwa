import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Closet, Clothes } from '../typeorm';
import DatabaseFile from '../typeorm/databaseFile.entity';
import { DatabaseFilesService } from '../database-files/database-files.service';

@Module({
  providers: [ClothesService, DatabaseFilesService],
  controllers: [ClothesController],
  exports: [ClothesService],
  imports: [TypeOrmModule.forFeature([Clothes, Closet, DatabaseFile])]
})
export class ClothesModule {}
