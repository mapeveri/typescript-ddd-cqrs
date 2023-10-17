import { Injectable } from '@nestjs/common';
import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EventStoreRepository } from '@src/shared/domain/eventStore/eventStoreRepository';
import MongoRepository from '@src/shared/infrastructure/persistence/mongo/mongoRepository';

@Injectable()
export default class MongoEventStoreRepository extends MongoRepository<DomainEvent> implements EventStoreRepository {
  constructor() {
    super('events');
  }
}
