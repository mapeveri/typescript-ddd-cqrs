import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Command } from '@src/shared/domain/bus/commandBus/command';
import { CommandBus as ICommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import TypeOrmTransactionalDecorator from '@src/shared/infrastructure/persistence/typeOrm/typeOrmTransactionalDecorator';

@Injectable()
export default class NestCommandBus implements ICommandBus {
  constructor(private commandBus: CommandBus) {}

  async dispatch(command: Command): Promise<void> {
    await new TypeOrmTransactionalDecorator(this.commandBus).execute(command);
  }
}
