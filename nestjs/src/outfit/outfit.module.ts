import { Module } from '@nestjs/common';
import { OutfitService } from './outfit.service';
import { OutfitController } from './outfit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Closet, Clothes, DatabaseFile, Outfit, User } from '../typeorm';
import { ClothesService } from '../clothes/clothes.service';
import { ClosetService } from '../closet/closet.service';
import { UserService } from '../user/user.service';
import DatabaseFilesService from '../database-files/database-files.service';

@Module({
  providers: [OutfitService, ClosetService, ClothesService, UserService, DatabaseFilesService],
  controllers: [OutfitController],
  exports: [OutfitService],
  imports: [TypeOrmModule.forFeature([Outfit, Closet, Clothes, User, DatabaseFile])]
})
export class OutfitModule {}
