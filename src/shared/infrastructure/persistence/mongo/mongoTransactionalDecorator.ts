import { Command } from '@src/shared/domain/buses/commandBus/command';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import MongoConnection from '@src/shared/infrastructure/persistence/mongo/mongoConnection';

export default class MongoTransactionalDecorator {
  constructor(readonly handler: CommandHandler) {}

  async handle(command: Command): Promise<void> {
    const connection = await MongoConnection.getInstance();
    const session = connection.client.startSession();
    session.startTransaction();

    try {
      this.handler.handle(command);
      session.commitTransaction();
    } catch (e) {
      if (session.transaction.isActive) {
        await session.abortTransaction();
      }
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
