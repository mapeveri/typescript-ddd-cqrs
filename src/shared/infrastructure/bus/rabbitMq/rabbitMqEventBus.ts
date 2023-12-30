import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EventBus as IEventBus } from '@src/shared/domain/buses/eventBus/eventBus';

@Injectable()
export class RabbitMqEventBus implements IEventBus {
  constructor(@Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy) {}

  publish(events: DomainEvent[]): void {
    events.forEach((event) => {
      const eventName = event.constructor.name;
      this.client.emit(eventName, event);
    });
  }
}
