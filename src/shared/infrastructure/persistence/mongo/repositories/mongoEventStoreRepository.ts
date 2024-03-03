import { Injectable } from '@nestjs/common';
import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';
import { EventStoreRepository } from '@src/shared/domain/eventStore/eventStoreRepository';
import MongoConnection, { MONGO_CLIENT } from '../mongoConnection';
import { Inject } from '@src/shared/domain/injector/inject.decorator';

@Injectable()
export default class MongoEventStoreRepository implements EventStoreRepository {
  constructor(@Inject(MONGO_CLIENT) private readonly mongo: MongoConnection) {}

  async save(entity: DomainEvent): Promise<void> {
    await this.mongo.db.collection('events').updateOne(
      { id: entity.eventId },
      {
        $set: {
          aggregateId: entity.aggregateId,
          type: entity.domainEventName(),
          payload: entity,
          occurredOn: entity.occurredOn,
        },
      },
      { upsert: true },
    );
  }
}
