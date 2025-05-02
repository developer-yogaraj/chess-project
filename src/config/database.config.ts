import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConstants } from './../constant';
import { Module } from '@nestjs/common';
import { PlayersAndArbiters } from 'src/entity';

@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        name: dbConstants.DATA_SOURCE_NAME,
        useFactory: async () => {
          return {
            type: 'postgres',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            entities: [
            PlayersAndArbiters
            ],
            //change synchronize true after migrations
            synchronize: true,
          };
        },
      }),
    ],
  })
  export class DatabaseModule {}
  