import UserRepository from '@src/languages/domain/user/userRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import CreateUserCommand from './createUserCommand';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import Email from '@src/shared/domain/valueObjects/email';
import User from '@src/languages/domain/user/user';

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
