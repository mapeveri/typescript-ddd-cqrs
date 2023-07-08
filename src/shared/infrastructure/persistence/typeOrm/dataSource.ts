import { DataSource, EntityManager, QueryRunner } from 'typeorm';

export class DataSourceHandler {
  private static instance: DataSourceHandler;
  private dataSourceValue: DataSource | null;
  private queryRunnerValue: QueryRunner | null;
  private entityManagerValue: EntityManager | null;

  private constructor() {}

  public static getInstance(): DataSourceHandler {
    if (!DataSourceHandler.instance) {
      DataSourceHandler.instance = new DataSourceHandler();
    }
    return DataSourceHandler.instance;
  }

  async initialize(): Promise<void> {
    const dataSource = new DataSource({
      type: 'postgres',
      url: process.env.POSTGRESQL_DB_URL,
      synchronize: false,
      logging: true,
      entities: [`${__dirname}../../../../../languages/infrastructure/persistence/typeOrm/entities/*.ts`],
      subscribers: [],
      migrations: [`${__dirname}../../../../../../migrations/**/*{.ts,.js}`],
      poolSize: 10,
    });

    this.dataSourceValue = await dataSource.initialize();
  }

  async releaseQueryRunner(): Promise<void> {
    if (!this.queryRunnerValue) {
      return;
    }

    if (this.queryRunnerValue.isTransactionActive) {
      throw Error('Cannot release queryRunner during an active transaction');
    }

    await this.queryRunnerValue.release();
    this.queryRunnerValue = null;
    this.entityManagerValue = null;

    this.createQueryRunner();
  }

  get entityManager(): EntityManager {
    if (!this.entityManagerValue) {
      throw Error('Entity manager empty...');
    }

    return this.entityManagerValue;
  }

  get queryRunner(): QueryRunner {
    if (!this.queryRunnerValue) {
      throw Error('QueryRunner empty...');
    }

    return this.queryRunnerValue;
  }

  private createQueryRunner(): void {
    if (!this.dataSourceValue || !this.dataSourceValue.isInitialized) {
      throw Error('DataSource not initialized...');
    }

    if (this.queryRunnerValue) {
      return;
    }

    this.queryRunnerValue = this.dataSourceValue.createQueryRunner();
    this.entityManagerValue = this.queryRunnerValue.manager;
  }
}
