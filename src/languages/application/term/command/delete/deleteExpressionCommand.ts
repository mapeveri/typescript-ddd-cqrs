import { Command } from '@src/shared/domain/bus/commandBus/command';

export default class DeleteExpressionCommand implements Command {
  constructor(public readonly id: string) {}
}
