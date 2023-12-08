import MongoConnection from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import { Collection } from 'mongodb';
import EntityProjection from '@src/shared/domain/projection/entityProjection';

export default abstract class MongoRepository<T extends EntityProjection> {
  protected collection: Collection<any>;
  private mongo: MongoConnection;

  protected constructor(collectionName: string) {
    this.initialize(collectionName);
  }

  async save(entity: T): Promise<void> {
    const session = this.mongo.session;
    if (!session) {
      throw new Error('The session is not available');
    }

    await this.collection.updateOne(
      { id: entity.id },
      { $set: entity.toPrimitives() },
      { upsert: true, session: session },
    );
  }

  private async initialize(collectionName: string): Promise<void> {
    this.mongo = await MongoConnection.getInstance();
    this.collection = this.mongo.db.collection(collectionName);
  }
}
