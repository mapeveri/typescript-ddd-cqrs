import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EventBus as IEventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import { backOff } from 'exponential-backoff';

@Injectable()
export default class NestEventBus implements IEventBus {
  constructor(private eventBus: EventBus) {}

  publish(events: DomainEvent[]): void {
    void backOff(() => this.eventBus.publishAll(events));
  }
}
