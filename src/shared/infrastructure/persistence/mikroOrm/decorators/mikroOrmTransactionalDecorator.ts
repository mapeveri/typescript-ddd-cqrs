import { MikroORM } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import { InjectMikroORMs } from '@mikro-orm/nestjs';

type FunctionToDecorate = () => Promise<void>;

@Injectable()
export default class MikroOrmTransactionalDecorator {
  constructor(
    @InjectMikroORMs() private readonly orms: MikroORM[],
    @Inject('MODULE_CONNECTIONS_NAME') private readonly moduleConnectionsNameMap: Map<string, string>,
  ) {}

  async execute(module: string, functionToDecorate: FunctionToDecorate): Promise<void> {
    const ormName = this.moduleConnectionsNameMap.get(module);

    if (!ormName) {
      throw new Error(`No ORM connection configured for module: ${module}`);
    }

    const orm = this.orms.find((orm) => orm.config.get('contextName') === ormName);

    if (!orm) {
      throw new Error(`No ORM instance found for connection: ${ormName}`);
    }

    const em = orm.em.fork();
    await em.transactional(async () => {
      await functionToDecorate();
      await em.flush();
    });
  }
}
