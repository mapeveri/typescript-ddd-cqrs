import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import AddLikeTermCommand from '@src/languages/application/term/command/create/addLikeTermCommand';

@CommandHandler(AddLikeTermCommand)
export default class AddLikeTermCommandHandler implements ICommandHandler<AddLikeTermCommand> {
  execute(_command: AddLikeTermCommand): Promise<any> {
    return Promise.resolve(undefined);
  }
}
