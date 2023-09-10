import { CommandBus } from '@nestjs/cqrs';
import { Command } from '@src/shared/domain/buses/commandBus/command';
import MongoConnection from '@src/shared/infrastructure/persistence/mongo/mongoConnection';

export default class MongoTransactionalDecorator {
  constructor(readonly commandBus: CommandBus) {}

  async execute(command: Command): Promise<void> {
    const connection = await MongoConnection.getInstance();
    const session = connection.startSession();
    session.startTransaction();

    try {
      await this.commandBus.execute(command);
      await session.commitTransaction();
    } catch (e) {
      if (session.transaction.isActive) {
        await session.abortTransaction();
      }
      await session.endSession();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
