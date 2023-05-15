import UserDoesNotExistsException from '../../../../domain/user/exceptions/userDoesNotExistsException';
import { CommandHandler } from '../../../../../shared/domain/buses/commandBus/commandHandler';
import UserRepository from '../../../../domain/user/userRepository';
import UpdateUserCommand from './updateUserCommand';
import UserId from '../../../../domain/user/valueObjects/userId';

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
