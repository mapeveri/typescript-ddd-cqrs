import { Inject, Injectable } from '@nestjs/common';
import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EventBus as IEventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMqEventBus implements IEventBus {
  constructor(@Inject('RABBITMQ_CLIENT') private client: ClientProxy) {}

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      void this.client.emit('DomainEvents', {
        name: event.domainEventName(),
        classPath: event.classPathName(),
        message: event,
      });
    }
  }
}
