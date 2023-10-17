import { DomainEvent } from '../buses/eventBus/domainEvent';

export interface EventStoreRepository {
  save(domainEvent: DomainEvent): void;
}

export const EVENT_STORE_REPOSITORY = Symbol('EventStoreRepository');