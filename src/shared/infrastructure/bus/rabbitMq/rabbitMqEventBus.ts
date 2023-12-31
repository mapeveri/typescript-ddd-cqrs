import { Injectable } from '@nestjs/common';
import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { EventBus as IEventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import RabbitMqHandler from '@src/shared/infrastructure/messenger/rabbitMq/rabbitMqHandler';
import Environment from '@src/shared/infrastructure/utils/environment';

@Injectable()
export class RabbitMqEventBus implements IEventBus {
  constructor(private readonly rabbitMqHandler: RabbitMqHandler) {}

  async publish(events: DomainEvent[]): Promise<void> {
    const rabbitMqUrl = Environment.getVariable('RABBITMQ_HOST');
    const queueName = Environment.getVariable('RABBITMQ_EVENTS_QUEUE');

    try {
      await this.rabbitMqHandler.connect(rabbitMqUrl);

      for (const event of events) {
        await this.rabbitMqHandler.publishToQueue(queueName, { name: event.classPathName(), data: event });
      }
    } catch (error) {
      console.error(`Error to publish domain events to RabbitMq ${error}`);
    } finally {
      await this.rabbitMqHandler.closeConnection();
    }
  }
}
