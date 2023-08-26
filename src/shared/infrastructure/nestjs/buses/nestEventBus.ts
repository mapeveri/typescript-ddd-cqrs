import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EventBus as IEventBus } from '@src/shared/domain/buses/eventBus/eventBus';

@Injectable()
export default class NestEventBus implements IEventBus {
  constructor(private eventBus: EventBus) {}

  publish(events: DomainEvent[]): void {
    void this.eventBus.publishAll(events);
  }
}
