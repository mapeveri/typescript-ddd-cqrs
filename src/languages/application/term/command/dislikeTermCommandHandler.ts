import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import TermId from '@src/languages/domain/term/termId';
import UserId from '@src/languages/domain/user/userId';
import DislikeTermCommand from '@src/languages/application/term/command/dislikeTermCommand';

@CommandHandler(DislikeTermCommand)
export default class DislikeTermCommandHandler implements ICommandHandler<DislikeTermCommand> {
  async execute(command: DislikeTermCommand): Promise<void> {
    TermId.of(command.termId);
    UserId.of(command.userId);
  }
}
