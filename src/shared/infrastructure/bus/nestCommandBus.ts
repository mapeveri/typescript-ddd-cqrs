import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Command } from '@src/shared/domain/bus/commandBus/command';
import { CommandBus as ICommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import TypeOrmTransactionalDecorator from '@src/shared/infrastructure/persistence/typeOrm/typeOrmTransactionalDecorator';

@Injectable()
export default class NestCommandBus implements ICommandBus {
  constructor(private commandBus: CommandBus, private readonly transactionalDecorator: TypeOrmTransactionalDecorator) {}

  async dispatch(command: Command): Promise<void> {
    await this.transactionalDecorator.execute(this.commandToExecute.bind(this, command));
  }

  private async commandToExecute(command: Command): Promise<void> {
    await this.commandBus.execute(command);
  }
}
