import Email from '../../../../../shared/domain/valueObjects/email';
import { CommandHandler } from '../../../../../shared/domain/buses/commandBus/commandHandler';
import User from '../../../../domain/user/user';
import UserRepository from '../../../../domain/user/userRepository';
import CreateUserCommand from './createUserCommand';
import UserId from '../../../../domain/user/valueObjects/userId';

export default class CreateUserCommandHandler implements CommandHandler {
  constructor(private userRepository: UserRepository) {}

  async handle(command: CreateUserCommand): Promise<void> {
    const user = User.create(
      new UserId(command.id),
      command.name,
      command.provider,
      new Email(command.email),
      command.photo
    );

    await this.userRepository.save(user);
  }
}
