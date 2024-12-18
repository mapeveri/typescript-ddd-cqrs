import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import UpdateUserCommand from './updateUserCommand';
import UserId from '@src/languages/domain/user/userId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import User from '@src/languages/domain/user/user';
import UserDoesNotExistsException from '@src/languages/domain/user/userDoesNotExistsException';

@CommandHandler(UpdateUserCommand)
export default class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.getUser(UserId.of(command.id));

    user.update(command.name, command.photo, command.interests);
    this.userRepository.save(user);

    void this.eventBus.publish(user.pullDomainEvents());
  }

  async getUser(userId: UserId): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (null === user) {
      throw new UserDoesNotExistsException(userId.toString());
    }

    return user;
  }
}
