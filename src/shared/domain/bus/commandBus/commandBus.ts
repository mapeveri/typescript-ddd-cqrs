import { Command } from './command';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
}

export const COMMAND_BUS = Symbol('CommandBus');
