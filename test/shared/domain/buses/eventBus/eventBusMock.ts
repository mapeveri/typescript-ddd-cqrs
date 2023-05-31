import { expect, jest } from '@jest/globals';
import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import { EventHandler } from '@src/shared/domain/buses/eventBus/eventHandler';

export class EventBusMock implements EventBus {
  register: jest.MockedFunction<(event: DomainEvent, handler: EventHandler[]) => void>;
  publish: jest.MockedFunction<(events: DomainEvent[]) => Promise<void>>;

  constructor() {
    this.publish = jest.fn();
    this.register = jest.fn();
  }

  expectPublishCalledWith(domainEvents: DomainEvent[]): void {
    expect(this.publish).toHaveBeenCalledWith(domainEvents);
  }

  expectPublishNotCalled(): void {
    expect(this.publish).not.toHaveBeenCalled();
  }
}
