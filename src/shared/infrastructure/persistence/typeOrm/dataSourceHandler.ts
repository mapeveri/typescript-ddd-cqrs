import { DataSource, EntityManager } from 'typeorm';
import dataSource from './dataSource';

export class DataSourceHandler {
  private static instance: DataSourceHandler;
  private dataSourceValue: DataSource | null;
  private entityManagerValue: EntityManager | null;

  private constructor() {}

  public static getInstance(): DataSourceHandler {
    if (!DataSourceHandler.instance) {
      DataSourceHandler.instance = new DataSourceHandler();
    }
    return DataSourceHandler.instance;
  }

  async initialize(): Promise<void> {
    this.dataSourceValue = await dataSource.initialize();
  }

  async transaction(callback: () => Promise<void>): Promise<void> {
    const dataSource = this.getDataSource();

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    this.entityManagerValue = queryRunner.manager;

    try {
      await queryRunner.startTransaction();
      await callback();
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.entityManagerValue = null;
      throw e;
    } finally {
      await queryRunner.release();
      this.entityManagerValue = null;
    }
  }

  get entityManager(): EntityManager {
    const dataSource = this.getDataSource();

    if (!this.entityManagerValue) {
      return dataSource.manager;
    }

    return this.entityManagerValue;
  }

  private getDataSource(): DataSource {
    if (!this.dataSourceValue || !this.dataSourceValue.isInitialized) {
      throw Error('Data source not initialized...');
    }

    return this.dataSourceValue;
  }
}
