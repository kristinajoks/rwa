import { Module } from '@nestjs/common';
import { ClosetService } from './closet.service';
import { ClosetController } from './closet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Closet, User } from '../typeorm';
import DatabaseFile from '../typeorm/databaseFile.entity';

@Module({
  providers: [ClosetService],
  exports: [ClosetService],
  controllers: [ClosetController],
  imports:[TypeOrmModule.forFeature([Closet, User, DatabaseFile])],
})
export class ClosetModule {}
