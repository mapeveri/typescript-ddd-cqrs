import { Command } from '@src/shared/domain/bus/commandBus/command';

export default class DislikeTermCommand implements Command {
  constructor(public readonly termId: string, public readonly userId: string) {}
}
