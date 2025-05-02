import { dbConstants } from './../constant';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { PlayersAndArbiters } from 'src/entity';

config();
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: dbConstants.SCHEMA_NAME,
  entities: [
    PlayersAndArbiters
  ],
  synchronize: false,
});

export default dataSource;
