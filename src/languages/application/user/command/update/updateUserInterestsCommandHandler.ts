import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import UserFinder from '@src/languages/domain/user/services/UserFinder';
import UpdateUserInterestsCommand from '@src/languages/application/user/command/update/updateUserInterestsCommand';
import { EVENT_BUS, EventBus } from '@src/shared/domain/buses/eventBus/eventBus';

@CommandHandler(UpdateUserInterestsCommand)
export default class UpdateUserInterestsCommandHandler implements ICommandHandler<UpdateUserInterestsCommand> {
  private readonly userFinder: UserFinder;

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async execute(command: UpdateUserInterestsCommand): Promise<void> {
    const user = await this.userFinder.find(UserId.of(command.userId));

    user.updateInterests(command.interests);
    await this.userRepository.save(user);

    void this.eventBus.publish(user.pullDomainEvents());
  }
}
