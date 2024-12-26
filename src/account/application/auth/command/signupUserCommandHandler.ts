import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import SignupUserCommand from '@src/account/application/auth/command/signupUserCommand';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import UserRepository, { USER_REPOSITORY } from '@src/account/domain/user/userRepository';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import UserId from '@src/account/domain/user/userId';
import UserAlreadyExistsException from '@src/account/domain/user/userAlreadyExistsException';
import User from '@src/account/domain/user/user';

@CommandHandler(SignupUserCommand)
export default class SignupUserCommandHandler implements ICommandHandler<SignupUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: SignupUserCommand): Promise<void> {
    await this.guardUserDoesNotExists(command.id);

    const user = User.create(command.id, command.name, command.provider, command.email, command.photo);

    this.userRepository.save(user);

    void this.eventBus.publish(user.pullDomainEvents());
  }

  private async guardUserDoesNotExists(id: string): Promise<void> {
    const userId = UserId.of(id);
    const user = await this.userRepository.findById(userId);
    if (user) {
      throw new UserAlreadyExistsException(userId.toString());
    }
  }
}
