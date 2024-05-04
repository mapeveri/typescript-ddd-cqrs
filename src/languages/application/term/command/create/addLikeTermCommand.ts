import { Command } from '@src/shared/domain/bus/commandBus/command';

export default class AddLikeTermCommand implements Command {
  constructor(public readonly termId: string, public readonly type: string, public readonly userId: string) {}
}
