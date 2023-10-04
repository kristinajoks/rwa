import { Module } from '@nestjs/common';
import { ClosetService } from './closet.service';
import { ClosetController } from './closet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Closet, User } from '../typeorm';
import DatabaseFile from '../typeorm/databaseFile.entity';
import { UserService } from '../user/user.service';
import DatabaseFilesService from '../database-files/database-files.service';

@Module({
  providers: [ClosetService, UserService, DatabaseFilesService],
  exports: [ClosetService],
  controllers: [ClosetController],
  imports:[TypeOrmModule.forFeature([Closet, User, DatabaseFile])],
})
export class ClosetModule {}
