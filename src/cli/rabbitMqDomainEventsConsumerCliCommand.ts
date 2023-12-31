import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { RabbitMqDomainEventsConsumer } from '@src/shared/infrastructure/bus/rabbitMq/rabbitMqDomainEventsConsumer';

@Injectable()
@Command({
  name: 'consume:rabbitmq-domain-events',
  description: 'RabbitMQ domain events consumer',
})
export class RabbitMqDomainEventsConsumerCliCommand extends CommandRunner {
  constructor(private readonly rabbitMQConsumer: RabbitMqDomainEventsConsumer) {
    super();
  }

  async run() {
    await this.rabbitMQConsumer.consume();
  }
}
