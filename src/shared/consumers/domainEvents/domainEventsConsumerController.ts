import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import Logger, { LOGGER } from '@src/shared/domain/services/logger';

@Controller()
export class DomainEventsConsumerController {
  constructor(
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
    @Inject(LOGGER) private readonly logger: Logger,
  ) {}

  @MessagePattern('DomainEvents')
  async handleMessage(data: any): Promise<any> {
    this.logger.log(`[DomainEventsConsumerController]: Data received: ${JSON.stringify(data)}`);

    try {
      const classPath = `@src/${data.classPath}`;
      const filePath = classPath.replace(/\./g, '/');

      const domainEventClass = require(filePath).default;
      const domainEvent = domainEventClass.fromPrimitives(data.message);

      this.logger.log(`[DomainEventsConsumerController]: Reacting to domain ${data.name}...`);
      await this.eventBus.publish([domainEvent]);

      this.logger.log('[DomainEventsConsumerController]: Handled...');
    } catch (e) {
      this.logger.error(`[DomainEventsConsumerController]: Error: ${e}`);
    }

    return;
  }
}
