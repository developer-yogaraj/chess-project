
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  dbConstants,
} from 'src/constant';
import {
  PlayersAndArbiters
} from './../entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AwsS3Service} from 'src/aws/aws-s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        PlayersAndArbiters,
      ],
      dbConstants.DATA_SOURCE_NAME,
    ),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AwsS3Service,
  ],
})
export class AuthModule {}
