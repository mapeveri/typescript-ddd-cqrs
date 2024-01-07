import { Command } from '@src/shared/domain/bus/commandBus/command';

export default class DeleteWordCommand implements Command {
  constructor(public readonly id: string) {}
}
