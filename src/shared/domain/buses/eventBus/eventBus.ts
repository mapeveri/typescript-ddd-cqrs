import { DomainEvent } from './domainEvent';
import { EventHandler } from './eventHandler';

export interface EventBus {
  publish(events: DomainEvent[]): Promise<void>;
  register(event: DomainEvent, handler: EventHandler[]): void;
}
