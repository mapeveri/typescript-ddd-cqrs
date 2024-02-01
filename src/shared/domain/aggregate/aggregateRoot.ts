import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';

export abstract class AggregateRoot {
  protected domainEvents: DomainEvent[];

  protected constructor() {
    this.domainEvents = [];
  }

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents;
    this.domainEvents = [];
    return domainEvents;
  }

  record(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }
}
