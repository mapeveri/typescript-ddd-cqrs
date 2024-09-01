import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

type FunctionToDecorate = () => Promise<void>;

@Injectable()
export default class MikroOrmTransactionalDecorator {
  constructor(private readonly em: EntityManager) {}

  async execute(functionToDecorate: FunctionToDecorate): Promise<void> {
    const em = this.em.fork();
    await em.transactional(async () => {
      await functionToDecorate();
      await em.flush();
    });
  }
}
