import MongoConnection from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import { Collection } from 'mongodb';

interface Identifiable {
  id: string;
}

export default abstract class MongoRepository<T extends Identifiable> {
  protected collection: Collection<any>;
  private mongo: MongoConnection;

  constructor(collectionName: string) {
    this.initialize(collectionName);
  }

  async save(entity: T): Promise<void> {
    const session = this.mongo.session;
    if (!session) {
      throw new Error('La sesión no está disponible');
    }

    await this.collection.updateOne({ id: entity.id }, { $set: entity }, { upsert: true, session: session });
  }

  private async initialize(collectionName: string): Promise<void> {
    this.mongo = await MongoConnection.getInstance();
    this.collection = this.mongo.db.collection(collectionName);
  }
}
