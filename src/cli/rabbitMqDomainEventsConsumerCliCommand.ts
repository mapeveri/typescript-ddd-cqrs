import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { RabbitMqConsumer } from '@src/shared/infrastructure/bus/rabbitMq/rabbitMqConsumer';

@Injectable()
@Command({
  name: 'consume:rabbitmq-domain-events',
  description: 'RabbitMQ domain events consumer',
})
export class RabbitMqDomainEventsConsumerCliCommand extends CommandRunner {
  constructor(private readonly rabbitMQConsumer: RabbitMqConsumer) {
    super();
  }

  async run() {
    await this.rabbitMQConsumer.execute();
  }
}
