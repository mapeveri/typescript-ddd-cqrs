import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import UpdateUserCommand from './updateUserCommand';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import UserDoesNotExistsException from '@src/languages/domain/user/exceptions/userDoesNotExistsException';
import { Inject } from '@nestjs/common';

export default class UpdateUserCommandHandler implements CommandHandler {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  async handle(command: UpdateUserCommand): Promise<void> {
    const user = await this.userRepository.findById(UserId.of(command.id));
    if (null === user) {
      throw new UserDoesNotExistsException();
    }

    user.update(command.name, command.photo);
    await this.userRepository.save(user);
  }
}
