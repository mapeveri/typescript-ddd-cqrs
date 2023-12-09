import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ProjectionBus } from '@src/shared/domain/buses/projectionBus/projectionBus';
import { Projection } from '@src/shared/domain/buses/projectionBus/projection';
import MongoTransactionalDecorator from '@src/shared/infrastructure/persistence/mongo/mongoTransactionalDecorator';

@Injectable()
export default class NestProjectionBus implements ProjectionBus {
  constructor(private commandBus: CommandBus) {}

  async dispatch(projection: Projection): Promise<void> {
    await new MongoTransactionalDecorator(this.commandBus).execute(projection);
  }
}
