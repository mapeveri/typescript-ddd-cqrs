import 'reflect-metadata';
import MongoConnection from '@src/shared/infrastructure/persistence/mongo/mongoConnection';

type Callback = (...args: any[]) => Promise<void>;

export async function mongoTransactionalOperation(handle: Callback, ...args: any[]): Promise<void> {
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

export function MongoTransactional<T extends { new (...args: any[]): NonNullable<unknown> }>(constructor: T): T {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      this.wrapMethodsWithTransaction(constructor);
    }

    private wrapMethodsWithTransaction(constructor: T) {
      Object.getOwnPropertyNames(constructor.prototype).forEach((methodName) => {
        const originalMethod = (this as any)[methodName];
        if (methodName !== 'constructor' && typeof originalMethod === 'function') {
          (this as any)[methodName] = async (...methodArgs: any[]) => {
            await mongoTransactionalOperation(originalMethod.bind(this), ...methodArgs);
          };
        }
      });
    }
  };
}
