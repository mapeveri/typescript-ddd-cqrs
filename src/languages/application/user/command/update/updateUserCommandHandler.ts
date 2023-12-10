import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import UpdateUserCommand from './updateUserCommand';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import UserFinder from '@src/languages/domain/user/services/UserFinder';

@CommandHandler(UpdateUserCommand)
export default class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  private readonly userFinder: UserFinder;

  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository);
  }

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.userFinder.find(UserId.of(command.id));

    user.update(command.name, command.photo);
    await this.userRepository.save(user);
  }
}
