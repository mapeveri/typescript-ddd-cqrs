import { Injectable } from '@nestjs/common';
import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';
import { EventStoreRepository } from '@src/shared/domain/eventStore/eventStoreRepository';
import MongoConnection from '../mongoConnection';
import { Collection } from 'mongodb';

@Injectable()
export default class MongoEventStoreRepository implements EventStoreRepository {
  protected collection: Collection<any>;
  private mongo: MongoConnection;

  constructor() {
    this.initialize('events');
  }

  async save(entity: DomainEvent): Promise<void> {
    await this.collection.updateOne(
      { id: entity.eventId },
      {
        $set: {
          aggregateId: entity.aggregateId,
          type: entity.domainEventName(),
          paylaod: entity,
          occurredOn: entity.occurredOn,
        },
      },
      { upsert: true },
    );
  }

  private async initialize(collectionName: string): Promise<void> {
    this.mongo = await MongoConnection.getInstance();
    this.collection = this.mongo.db.collection(collectionName);
  }
}
