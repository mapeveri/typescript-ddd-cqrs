import { entitySchemas } from '@src/shared/_dependencyInjection/entitySchemas';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRESQL_DB_URL,
  synchronize: false,
  logging: true,
  entities: entitySchemas,
  subscribers: [],
  migrationsRun: true,
  logger: 'advanced-console',
  migrations: [`${__dirname}../../../../../languages/app/migrations/**/*{.ts,.js}`],
  poolSize: 10,
};

const dataSource = new DataSource(dataSourceConfig);

export default dataSource;
