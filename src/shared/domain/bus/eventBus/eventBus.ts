import { DomainEvent } from './domainEvent';

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>;
}

export const EVENT_BUS = Symbol('EventBus');

export const ASYNC_EVENT_BUS = Symbol('AsyncEventBus');
