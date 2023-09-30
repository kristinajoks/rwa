import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Closet, User } from 'src/typeorm';
import { ClosetService } from '../closet/closet.service';

@Module({
  providers: [UserService, ClosetService],
  exports: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Closet])],
})
export class UserModule {}
