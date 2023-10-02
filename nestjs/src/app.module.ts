import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClosetModule } from './closet/closet.module';
import { ClothesModule } from './clothes/clothes.module';
import { OutfitModule } from './outfit/outfit.module';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import entities from './typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    ClosetModule,
    ClothesModule,
    OutfitModule
  ],
  controllers: [AppController, ImageController],
  providers: [AppService, ImageService],
})
export class AppModule {}
