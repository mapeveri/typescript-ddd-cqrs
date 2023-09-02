import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import UpdateUserCommand from './updateUserCommand';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import UserDoesNotExistsException from '@src/languages/domain/user/exceptions/userDoesNotExistsException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';

@CommandHandler(UpdateUserCommand)
export default class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.userRepository.findById(UserId.of(command.id));
    if (null === user) {
      throw new UserDoesNotExistsException();
    }

    user.update(command.name, command.photo);
    await this.userRepository.save(user);
  }
}
