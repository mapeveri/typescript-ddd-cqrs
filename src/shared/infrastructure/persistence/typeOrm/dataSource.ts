import * as path from 'node:path';
import { typeOrmEntitySchemas } from '@src/shared/_dependencyInjection/typeOrmEntitySchemas';
import { DataSource, DataSourceOptions } from 'typeorm';

const migrationsPath = path.join(__dirname, '../../../../languages/app/migrations/*{.ts,.js}');

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRESQL_DB_URL,
  synchronize: false,
  logging: true,
  entities: typeOrmEntitySchemas,
  subscribers: [],
  migrationsRun: true,
  logger: 'advanced-console',
  migrations: [migrationsPath],
  poolSize: 10,
};

const dataSource = new DataSource(dataSourceConfig);

export default dataSource;
