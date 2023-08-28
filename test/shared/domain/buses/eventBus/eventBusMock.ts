import { expect, jest } from '@jest/globals';
import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';

export class EventBusMock implements EventBus {
  publish: jest.MockedFunction<(events: DomainEvent[]) => Promise<void>>;

  constructor() {
    this.publish = jest.fn();
  }

  expectPublishCalledWith(domainEvents: DomainEvent[]): void {
    expect(this.publish).toHaveBeenCalledWith(domainEvents);
  }

  expectPublishNotCalled(): void {
    expect(this.publish).not.toHaveBeenCalled();
  }
}
