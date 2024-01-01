import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EVENT_BUS, EventBus } from '@src/shared/domain/buses/eventBus/eventBus';

@Controller()
export class DomainEventsConsumerController {
  constructor(@Inject(EVENT_BUS) private readonly eventBus: EventBus) {}

  @MessagePattern('DomainEvents')
  async handleMessage(data: any): Promise<any> {
    console.log(`Data received: ${JSON.stringify(data)}`);

    try {
      const classPath = `@src/${data.classPath}`;
      const filePath = classPath.replace(/\./g, '/');
      console.log(filePath);

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
