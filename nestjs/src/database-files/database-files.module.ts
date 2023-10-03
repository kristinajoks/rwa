import { Module } from '@nestjs/common';
import { DatabaseFilesService } from './database-files.service';
import { DatabaseFilesController } from './database-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseFile from '../typeorm/databaseFile.entity';

@Module({
  providers: [DatabaseFilesService],
  controllers: [DatabaseFilesController],
  exports: [DatabaseFilesService],
  imports: [TypeOrmModule.forFeature([DatabaseFile])]
})
export class DatabaseFilesModule {}
