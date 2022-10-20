import { DataSource } from 'typeorm';
import { getDbConfig } from './db.config';

export const AppDataSource = new DataSource(getDbConfig());
