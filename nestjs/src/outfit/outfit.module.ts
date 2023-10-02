import { Module } from '@nestjs/common';
import { OutfitService } from './outfit.service';
import { OutfitController } from './outfit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outfit } from '../typeorm';

@Module({
  providers: [OutfitService],
  controllers: [OutfitController],
  exports: [OutfitService],
  imports: [TypeOrmModule.forFeature([Outfit])]
})
export class OutfitModule {}
