import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

type FunctionToDecorate = () => Promise<void>;

@Injectable()
export class TypeOrmTransactionalEntityManager {
  private entityManager: EntityManager | null = null;
  constructor(private readonly dataSource: DataSource) {}

  async transaction(callback: FunctionToDecorate): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    this.entityManager = queryRunner.manager;

    try {
      await queryRunner.startTransaction();
      await callback();
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.entityManager = null;
      throw e;
    } finally {
      await queryRunner.release();
      this.entityManager = null;
    }
  }

  em(): EntityManager {
    if (!this.entityManager) {
      return this.dataSource.manager;
    }

    return this.entityManager;
  }
}
