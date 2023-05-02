import { Command } from './command';

export interface CommandHandler {
  handle(command: Command): void;
}
