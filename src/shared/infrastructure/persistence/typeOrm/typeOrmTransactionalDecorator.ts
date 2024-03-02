import { TypeOrmTransactionalEntityManager } from '@src/shared/infrastructure/persistence/typeOrm/typeOrmTransactionalEntityManager';
import { Injectable } from '@nestjs/common';

type FunctionToDecorate = () => Promise<void>;

@Injectable()
export default class TypeOrmTransactionalDecorator {
  constructor(private entityManager: TypeOrmTransactionalEntityManager) {}

  async execute(functionToDecorate: FunctionToDecorate): Promise<void> {
    await this.entityManager.transaction(functionToDecorate);
  }
}
