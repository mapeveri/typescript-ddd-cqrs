import { DataSource, EntityManager, QueryRunner } from 'typeorm';

export class DataSourceHandler {
  private static instance: DataSourceHandler;
  private dataSource: DataSource | null;
  private queryRunner: QueryRunner | null;
  private entityManager: EntityManager | null;

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
    });

    this.dataSource = await dataSource.initialize();

    this.createQueryRunner();
  }

  entityManagerValue(): EntityManager {
    if (!this.entityManager) {
      throw Error('Entity manager empty...');
    }

    return this.entityManager;
  }

  queryRunnerValue(): QueryRunner {
    if (!this.queryRunner) {
      throw Error('QueryRunner empty...');
    }

    return this.queryRunner;
  }

  async releaseQueryRunner(): Promise<void> {
    if (!this.queryRunner) {
      return;
    }

    if (this.queryRunner.isTransactionActive) {
      throw Error('Cannot release queryRunner during an active transaction');
    }

    await this.queryRunner.release();
    this.queryRunner = null;
    this.entityManager = null;

    this.createQueryRunner();
  }

  private createQueryRunner(): void {
    if (!this.dataSource || !this.dataSource.isInitialized) {
      throw Error('DataSource not initialized...');
    }

    if (this.queryRunner) {
      return;
    }

    this.queryRunner = this.dataSource.createQueryRunner();
    this.entityManager = this.queryRunner.manager;
  }
}
