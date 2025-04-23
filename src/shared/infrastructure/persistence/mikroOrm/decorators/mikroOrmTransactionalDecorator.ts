import { MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { InjectMikroORMs } from '@mikro-orm/nestjs';

type FunctionToDecorate = () => Promise<void>;

@Injectable()
export default class MikroOrmTransactionalDecorator {
  private readonly moduleConnectionMap = new Map<string, string>([
    ['AccountModule', 'account'],
    ['LanguageModule', 'language'],
  ]);

  constructor(@InjectMikroORMs() private readonly orms: MikroORM[]) {}

  async execute(module: string, functionToDecorate: FunctionToDecorate): Promise<void> {
    const ormName = this.moduleConnectionMap.get(module);

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
