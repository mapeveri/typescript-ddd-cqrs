import { DataSource } from 'typeorm';

const ENTITIES: Array<string> = [process.env.TYPE_ORM_ENTITIES || ''];

export default new DataSource({
  type: 'postgres',
  url: process.env.POSTGRESQL_DB_URL,
  synchronize: false,
  logging: true,
  entities: ENTITIES,
  subscribers: [],
  migrations: [__dirname + '../../../../../../migrations/**/*{.ts,.js}'],
});
