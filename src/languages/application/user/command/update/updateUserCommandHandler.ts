import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import UpdateUserCommand from './updateUserCommand';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import UserFinder from '@src/languages/domain/user/services/userFinder';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';

@CommandHandler(UpdateUserCommand)
export default class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
  private readonly userFinder: UserFinder;

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async execute(command: UpdateUserCommand): Promise<void> {
    const user = await this.userFinder.find(UserId.of(command.id));

    user.update(command.name, command.photo, command.interests);
    await this.userRepository.save(user);

    void this.eventBus.publish(user.pullDomainEvents());
  }
}
