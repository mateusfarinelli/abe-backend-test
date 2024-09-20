import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'db_survey',
  synchronize: false,
  logging: false,
  entities: ["./src/domain/entities/*.ts"],
});