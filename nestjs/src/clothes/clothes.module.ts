import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Closet, Clothes } from '../typeorm';

@Module({
  providers: [ClothesService],
  controllers: [ClothesController],
  exports: [ClothesService],
  imports: [TypeOrmModule.forFeature([Clothes, Closet])]
})
export class ClothesModule {}
