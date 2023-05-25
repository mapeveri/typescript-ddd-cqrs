import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import { EventHandler } from '@src/shared/domain/buses/eventBus/eventHandler';

export default class MemoryEventBus implements EventBus {
  private static handlers: { [key: string]: EventHandler[] } = {};

  public register(event: DomainEvent, handlers: EventHandler[]): void {
    MemoryEventBus.handlers[event.domainEventName()] = handlers;
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      const handlers = MemoryEventBus.handlers[event.constructor.name];
      if (handlers) {
        await Promise.all(handlers.map(handler => handler.handle(event)));
      }
    }
  }
}
