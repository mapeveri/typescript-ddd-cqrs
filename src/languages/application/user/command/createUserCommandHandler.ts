import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import CreateUserCommand from './createUserCommand';
import UserId from '@src/languages/domain/user/userId';
import Email from '@src/shared/domain/valueObjects/email';
import User from '@src/languages/domain/user/user';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import UserAlreadyExistsException from '@src/languages/domain/user/userAlreadyExistsException';

@CommandHandler(CreateUserCommand)
export default class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const userId = UserId.of(command.id);
    userId.guardIsValid(command.email);
    await this.guardUserDoesNotExists(userId);

    const user = User.create(userId, command.name, command.provider, Email.of(command.email), command.photo);

    await this.userRepository.save(user);
  }

  private async guardUserDoesNotExists(userId: UserId): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (user) {
      throw new UserAlreadyExistsException(userId.value);
    }
  }
}
