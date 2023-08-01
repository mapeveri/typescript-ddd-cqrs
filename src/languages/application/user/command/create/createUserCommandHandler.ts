import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import CreateUserCommand from './createUserCommand';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import Email from '@src/shared/domain/valueObjects/email';
import User from '@src/languages/domain/user/user';
import { Inject } from '@src/shared/domain/injector/inject.decorator';

export default class CreateUserCommandHandler implements CommandHandler {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  async handle(command: CreateUserCommand): Promise<void> {
    const user = User.create(
      UserId.of(command.id),
      command.name,
      command.provider,
      Email.of(command.email),
      command.photo
    );

    await this.userRepository.save(user);
  }
}
