import { CommandHandler } from '../../../../../shared/domain/buses/commandBus/commandHandler';
import UserRepository from '../../../../domain/user/userRepository';
import UpdateUserCommand from './updateUserCommand';

export default class UpdateUserCommandHandler implements CommandHandler {
  constructor(private userRepository: UserRepository) {}

  async handle(command: UpdateUserCommand): Promise<void> {
    const user = await this.userRepository.findById(command.id);
    if (null === user) {
      return;
    }

    user.update(command.name, command.photo);
    await this.userRepository.save(user);
  }
}
