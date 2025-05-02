import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database.config';
import {
  PlayersAndArbiters
} from './entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConstants } from './constant';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    TypeOrmModule.forFeature(
      [PlayersAndArbiters],
      dbConstants.DATA_SOURCE_NAME,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
