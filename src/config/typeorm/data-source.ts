import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations'
});

if (!AppDataSource.isInitialized) {
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized for migrations!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization for migrations:', err);
    });
}
