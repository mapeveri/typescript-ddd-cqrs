import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import CreateUserCommand from '../../command/create/createUserCommand';
import UpdateUserCommand from '../../command/update/updateUserCommand';
import AuthSessionCreatedEvent from '@src/languages/domain/auth/domainEvents/authSessionCreatedEvent';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/buses/eventBus/eventsHandler';

@EventsHandler(AuthSessionCreatedEvent)
export default class CreateOrUpdateUserOnAuthSessionCreatedEventHandler
  implements IEventHandler<AuthSessionCreatedEvent>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(COMMAND_BUS) private readonly commandBus: CommandBus,
  ) {}

  async handle(event: AuthSessionCreatedEvent): Promise<void> {
    const userId = UserId.fromEmailWithValidation(event.id, event.email);
    const user = await this.userRepository.findById(userId);
    if (null === user) {
      await this.createUser(userId, event);
      return;
    }

    await this.updateUser(userId, event);
  }

  private async createUser(userId: UserId, event: AuthSessionCreatedEvent): Promise<void> {
    await this.commandBus.dispatch(
      new CreateUserCommand(userId.toString(), event.name, event.email, event.token, event.provider, event.photo),
    );
  }

  private async updateUser(userId: UserId, event: AuthSessionCreatedEvent): Promise<void> {
    await this.commandBus.dispatch(new UpdateUserCommand(userId.toString(), event.name, event.photo));
  }
}
