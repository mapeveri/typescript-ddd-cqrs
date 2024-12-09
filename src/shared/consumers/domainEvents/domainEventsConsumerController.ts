import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import { CreateRequestContext, MikroORM } from '@mikro-orm/core';

@Controller()
export class DomainEventsConsumerController {
  constructor(private readonly orm: MikroORM, @Inject(EVENT_BUS) private readonly eventBus: EventBus) {}

  @MessagePattern('DomainEvents')
  @CreateRequestContext((self: DomainEventsConsumerController) => self.orm)
  async handleMessage(data: any): Promise<any> {
    console.log(`Data received: ${JSON.stringify(data)}`);

    try {
      const classPath = `@src/${data.classPath}`;
      const filePath = classPath.replace(/\./g, '/');

      const domainEventClass = require(filePath).default;
      const domainEvent = domainEventClass.fromPrimitives(data.message);

      console.log(`Reacting to domain ${data.name}...`);
      await this.eventBus.publish([domainEvent]);

      console.log('Handled...');
    } catch (e) {
      console.error(e);
    }

    return;
  }
}
