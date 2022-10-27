import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const getDbConfig = (): DataSourceOptions => {
  const dbUrl = process.env.DATABASE_URL;
  const nodeEnv = process.env.NODE_ENV;
  if (!dbUrl && typeof dbUrl !== 'string') {
    throw new Error('DATABASE_URL');
  }
  if (!nodeEnv) {
    throw new Error('NODE_ENV not set');
  }
  const ssl =
    nodeEnv === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false;

  return {
    url: dbUrl,
    type: 'postgres',
    ssl,
    entities: ['./**/*.entity.js'],
    migrations: ['./src/migrations/*.js'],
    synchronize: true,
    logging: true,
  };
};
