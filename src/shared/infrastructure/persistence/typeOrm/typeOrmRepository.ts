import { EntityManager } from 'typeorm';
import { TypeOrmTransactionalEntityManager } from '@src/shared/infrastructure/persistence/typeOrm/typeOrmTransactionalEntityManager';
import { Injectable } from '@nestjs/common';

@Injectable()
export default abstract class TypeOrmRepository {
  constructor(private readonly transactionalEntityManager: TypeOrmTransactionalEntityManager) {}

  get em(): EntityManager {
    return this.transactionalEntityManager.em();
  }
}
