import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Command } from '@src/shared/domain/buses/commandBus/command';
import { CommandBus as ICommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import TransactionalHandlerDecoratorFactory from '../../persistence/transactionalHandlerDecoratorFactory';

@Injectable()
export default class NestCommandBus implements ICommandBus {
  constructor(private commandBus: CommandBus) {}

  async dispatch(command: Command): Promise<void> {
    await new TransactionalHandlerDecoratorFactory(this.commandBus).execute(command);
  }
}
