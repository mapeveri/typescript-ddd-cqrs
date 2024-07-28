import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';
import { EventBus } from '@src/shared/domain/bus/eventBus/eventBus';

export class EventBusMock implements EventBus {
  private storedEvents: DomainEvent[] = [];

  async publish(events: DomainEvent[]): Promise<void> {
    this.storedEvents.push(...events);
  }

  domainEvents(): DomainEvent[] {
    return this.storedEvents;
  }

  clean(): void {
    this.storedEvents = [];
  }
}
