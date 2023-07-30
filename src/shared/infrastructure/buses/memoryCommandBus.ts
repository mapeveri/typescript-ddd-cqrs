import { Injectable } from '@nestjs/common';
import { Command } from '@src/shared/domain/buses/commandBus/command';
import { CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';

@Injectable()
export default class MemoryCommandBus implements CommandBus {
  public static readonly handlers: { [key: string]: CommandHandler } = {};

  register(command: Command, handler: CommandHandler): void {
    MemoryCommandBus.handlers[command.constructor.name] = handler;
  }

  async dispatch(command: Command): Promise<void> {
    const handler = MemoryCommandBus.handlers[command.constructor.name];
    await handler.handle(command);
  }
}
