import { Command } from '@src/shared/domain/buses/commandBus/command';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import {
  queryRunner as queryRunnerPromise,
  releaseQueryRunner,
} from '@src/shared/infrastructure/persistence/typeOrm/dataSource';

export default class TypeOrmTransactionalDecorator {
  constructor(readonly handler: CommandHandler) {}

  async handle(command: Command): Promise<void> {
    const queryRunner = await queryRunnerPromise;
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();
      await this.handler.handle(command);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await releaseQueryRunner();
    }
  }
}
