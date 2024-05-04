import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import AddLikeTermCommand from '@src/languages/application/term/command/create/addLikeTermCommand';
import TermId from '@src/languages/domain/term/termId';
import UserId from '@src/languages/domain/user/userId';
import TermType from '@src/languages/domain/term/termType';

@CommandHandler(AddLikeTermCommand)
export default class AddLikeTermCommandHandler implements ICommandHandler<AddLikeTermCommand> {
  async execute(command: AddLikeTermCommand): Promise<any> {
    TermId.of(command.termId);
    TermType.of(command.type);
    UserId.of(command.userId);

    return Promise.resolve(undefined);
  }
}
