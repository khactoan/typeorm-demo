import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const DATA_SOURCE_OPTIONS: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const AppDataSource = new DataSource({
  ...DATA_SOURCE_OPTIONS,
  migrations: ['src/database/migrations/*.ts'],
});

export default AppDataSource;
