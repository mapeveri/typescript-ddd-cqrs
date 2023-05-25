import UserRepository from '@src/languages/domain/user/userRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import UpdateUserCommand from './updateUserCommand';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import UserDoesNotExistsException from '@src/languages/domain/user/exceptions/userDoesNotExistsException';

export default class UpdateUserCommandHandler implements CommandHandler {
  constructor(private userRepository: UserRepository) {}

  async handle(command: UpdateUserCommand): Promise<void> {
    const user = await this.userRepository.findById(new UserId(command.id));
    if (null === user) {
      throw new UserDoesNotExistsException();
    }

    user.update(command.name, command.photo);
    await this.userRepository.save(user);
  }
}
