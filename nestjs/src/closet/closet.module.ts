import { Module } from '@nestjs/common';
import { ClosetService } from './closet.service';
import { ClosetController } from './closet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Closet, User } from '../typeorm';

@Module({
  providers: [ClosetService],
  exports: [ClosetService],
  controllers: [ClosetController],
  imports:[TypeOrmModule.forFeature([Closet, User])],
})
export class ClosetModule {}
