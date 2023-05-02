import { Command } from '../../domain/buses/commandBus/command';
import { CommandBus } from '../../domain/buses/commandBus/commandBus';
import { CommandHandler } from '../../domain/buses/commandBus/commandHandler';

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
