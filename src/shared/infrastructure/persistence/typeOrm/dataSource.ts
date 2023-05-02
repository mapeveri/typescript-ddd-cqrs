import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: process.env.POSTGRESQL_DB_URL,
  synchronize: false,
  logging: true,
  entities: ['src/languages/infrastructure/persistence/typeOrm/entities/*.ts'],
  subscribers: [],
  migrations: [__dirname + '../../../../../../migrations/**/*{.ts,.js}'],
});
