import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import UserId from '@src/languages/domain/user/userId';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import CreateUserCommand from '../command/createUserCommand';
import AuthSessionCreatedEvent from '@src/languages/domain/auth/authSessionCreatedEvent';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';

@EventsHandler(AuthSessionCreatedEvent)
export default class CreateUserOnAuthSessionCreatedEventHandler implements IEventHandler<AuthSessionCreatedEvent> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(COMMAND_BUS) private readonly commandBus: CommandBus,
  ) {}

  async handle(event: AuthSessionCreatedEvent): Promise<void> {
    const userId = UserId.of(event.id);
    const user = await this.userRepository.findById(userId);
    if (null !== user) {
      return;
    }

    await this.commandBus.dispatch(
      new CreateUserCommand(userId.toString(), event.name, event.email, event.token, event.provider, event.photo),
    );
  }
}
