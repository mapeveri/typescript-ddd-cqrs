import { CommandBus } from '@nestjs/cqrs';
import { Command } from '@src/shared/domain/bus/commandBus/command';
import { DataSourceHandler } from '@src/shared/infrastructure/persistence/typeOrm/dataSourceHandler';

export default class TypeOrmTransactionalDecorator {
  constructor(readonly commandBus: CommandBus) {}

  async execute(command: Command): Promise<void> {
    const dataSourceHandler = DataSourceHandler.getInstance();
    await dataSourceHandler.transaction(async () => {
      await this.commandBus.execute(command);
    });
  }
}
