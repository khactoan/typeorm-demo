import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'xxx',
  host: 'xxx',
  port: 3306,
  username: 'xxx',
  password: 'xxx',
  database: 'xxx',
  migrations: ['src/database/migrations/*.ts'],
});

export default AppDataSource;
