import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import MongoTransactionalDecorator from './mongo/mongoTransactionalDecorator';
import TypeOrmTransactionalDecorator from './typeOrm/typeOrmTransactionalDecorator';

export default class TransactionalHandlerDecoratorFactory {
  constructor(readonly handler: CommandHandler) {}

  get(database: string): MongoTransactionalDecorator | TypeOrmTransactionalDecorator {
    if (database === 'mongo') {
      return new MongoTransactionalDecorator(this.handler);
    }

    return new TypeOrmTransactionalDecorator(this.handler);
  }
}
