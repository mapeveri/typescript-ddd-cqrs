import { Command } from '@src/shared/domain/buses/commandBus/command';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import { DataSourceHandler } from '@src/shared/infrastructure/persistence/typeOrm/dataSourceHandler';

export default class TypeOrmTransactionalDecorator {
  constructor(readonly handler: CommandHandler) {}

  async handle(command: Command): Promise<void> {
    const dataSourceHandler = DataSourceHandler.getInstance();
    await dataSourceHandler.transaction(async () => {
      await this.handler.handle(command);
    });
  }
}
