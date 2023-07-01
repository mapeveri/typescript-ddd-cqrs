import { DataSource, QueryRunner } from 'typeorm';

let queryRunnerPromise: QueryRunner | null = null;

export const configureDatabase = async (): Promise<QueryRunner> => {
  if (queryRunnerPromise) {
    return queryRunnerPromise;
  }

  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.POSTGRESQL_DB_URL,
    synchronize: false,
    logging: true,
    entities: [`${__dirname}../../../../../languages/infrastructure/persistence/typeOrm/entities/*.ts`],
    subscribers: [],
    migrations: [`${__dirname}../../../../../../migrations/**/*{.ts,.js}`],
  });

  await dataSource.initialize();
  queryRunnerPromise = dataSource.createQueryRunner();

  return queryRunnerPromise;
};

export const releaseQueryRunner = async (): Promise<void> => {
  if (!queryRunnerPromise) {
    return;
  }

  await queryRunnerPromise.release();
};

export const queryRunner: Promise<QueryRunner> = configureDatabase();
