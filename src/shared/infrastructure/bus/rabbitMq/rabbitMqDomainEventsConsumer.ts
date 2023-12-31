import { Injectable } from '@nestjs/common';
import { EVENT_BUS, EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import RabbitMqHandler from '@src/shared/infrastructure/messenger/rabbitMq/rabbitMqHandler';
import Environment from '@src/shared/infrastructure/utils/environment';

@Injectable()
export class RabbitMqDomainEventsConsumer {
  constructor(
    private readonly rabbitMqHandler: RabbitMqHandler,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {
    process.on('SIGINT', () => this.handleSignal('SIGINT'));
    process.on('SIGTERM', () => this.handleSignal('SIGTERM'));
  }

  public async consume() {
    const rabbitMqUrl = Environment.getVariable('RABBITMQ_HOST');
    const queueName = Environment.getVariable('RABBITMQ_EVENTS_QUEUE');

    try {
      console.log('Starting to consume');
      await this.rabbitMqHandler.connect(rabbitMqUrl);

      console.log(`Subscribed to the queue ${queueName}`);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await this.rabbitMqHandler.subscribeToQueue(queueName, async (msg) => {
          if (msg === null) {
            return;
          }
          const message = JSON.parse(msg.content.toString());
          console.log('Received message:', message);

          const domainEventClass = require(`${message.name}`).default;
          const domainEvent = domainEventClass.fromPrimitives(message.data);
          await this.eventBus.publish([domainEvent]);

          await this.rabbitMqHandler.ackMessage(msg);
        });
      }
    } catch (error) {
      console.error('Error trying to connect to RabbitMQ:', error);
    } finally {
      console.log('Finally: Close connection');
      await this.rabbitMqHandler.closeConnection();
    }
  }

  private async handleSignal(signal: string) {
    console.log(`Received ${signal} signal. Shutting down gracefully...`);

    await this.rabbitMqHandler.closeConnection();

    console.log('Application shut down.');
    process.exit(0);
  }
}
