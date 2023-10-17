import { CommandBus } from '@nestjs/cqrs';
import { Command } from '@src/shared/domain/buses/commandBus/command';
import MongoConnection from '@src/shared/infrastructure/persistence/mongo/mongoConnection';

type Callback = (...args: any[]) => Promise<void>;

export async function mongoTransactionalOperation(handle: Callback, ...args: any[]) {
  const connection = await MongoConnection.getInstance();
  const session = connection.startSession();
  session.startTransaction();

  try {
    await handle(...args);
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

export default class MongoTransactionalDecorator {
  constructor(readonly commandBus: CommandBus) {}

  async execute(command: Command): Promise<void> {
    await mongoTransactionalOperation(async (command: Command) => {
      await this.commandBus.execute(command);
    }, command);
  }
}
