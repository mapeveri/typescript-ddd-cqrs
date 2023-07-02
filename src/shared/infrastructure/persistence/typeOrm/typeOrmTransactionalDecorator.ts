import { Command } from '@src/shared/domain/buses/commandBus/command';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import { DataSourceHandler } from '@src/shared/infrastructure/persistence/typeOrm/dataSource';

export default class TypeOrmTransactionalDecorator {
  constructor(readonly handler: CommandHandler) {}

  async handle(command: Command): Promise<void> {
    const dataSourceHandler = DataSourceHandler.getInstance();
    const queryRunner = dataSourceHandler.queryRunnerValue();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();
      await this.handler.handle(command);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await dataSourceHandler.releaseQueryRunner();
    }
  }
}
