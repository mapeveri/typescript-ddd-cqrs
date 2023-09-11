import { Command } from '@src/shared/domain/buses/commandBus/command';

export default class DeleteExpressionCommand implements Command {
  constructor(public readonly id: string) {}
}
