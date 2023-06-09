import { DomainEvent } from '../buses/eventBus/domainEvent';

export abstract class AggregateRoot {
  protected domainEvents: DomainEvent[];

  constructor() {
    this.domainEvents = [];
  }

  pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents;
    this.domainEvents = [];
    return domainEvents;
  }

  record(domain_event: DomainEvent): void {
    this.domainEvents.push(domain_event);
  }
}
