import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Command } from '@src/shared/domain/bus/commandBus/command';
import { CommandBus as ICommandBus } from '@src/shared/domain/bus/commandBus/commandBus';

@Injectable()
export default class NestCommandBus implements ICommandBus {
  constructor(private commandBus: CommandBus) {}

  async dispatch(command: Command): Promise<void> {
    await this.commandToExecute.bind(this, command);
  }

  private async commandToExecute(command: Command): Promise<void> {
    await this.commandBus.execute(command);
  }
}
