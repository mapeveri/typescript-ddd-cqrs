import { CommandBus } from '@nestjs/cqrs';
import Projection from '@src/shared/domain/projection/projection';
import MongoTransactionalDecorator from './mongo/mongoTransactionalDecorator';
import TypeOrmTransactionalDecorator from './typeOrm/typeOrmTransactionalDecorator';
import { Command } from '@src/shared/domain/buses/commandBus/command';

export default class TransactionalHandlerDecoratorFactory {
  constructor(readonly commandBus: CommandBus) {}

  async execute(command: Command | Projection): Promise<void> {
    if (command instanceof Projection) {
      new MongoTransactionalDecorator(this.commandBus).execute(command);
      return;
    }

    new TypeOrmTransactionalDecorator(this.commandBus).execute(command);
  }
}
