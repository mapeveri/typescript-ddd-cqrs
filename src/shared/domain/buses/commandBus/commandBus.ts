import { Command } from './command';
import { CommandHandler } from './commandHandler';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
  register(command: Command, handler: CommandHandler): void;
}
