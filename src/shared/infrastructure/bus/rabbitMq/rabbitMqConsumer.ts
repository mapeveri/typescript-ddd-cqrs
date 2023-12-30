import { Injectable } from '@nestjs/common';
import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EVENT_BUS, EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { AMQPConnectionManager } from 'amqp-connection-manager';

@Injectable()
export class RabbitMqConsumer {
  constructor(
    private readonly connectionManager: AMQPConnectionManager,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  public async execute() {
    const connection = await this.connectionManager.getConnection();

    const consumer = connection.createConsumer('events_queue');

    consumer.subscribe();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      console.log('Loop...');
      const message = await connection.next();
      console.log('Received message:', message);
      void this.eventBus.publish([DomainEvent.fromPrimitives(message)]);
    }
  }
}
