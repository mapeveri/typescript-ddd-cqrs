import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import CreateUserCommand from '../command/createUserCommand';
import AuthSessionCreatedEvent from '@src/languages/domain/auth/authSessionCreatedEvent';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import Email from '@src/shared/domain/valueObjects/email';

@EventsHandler(AuthSessionCreatedEvent)
export default class CreateUserOnAuthSessionCreatedEventHandler implements IEventHandler<AuthSessionCreatedEvent> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(COMMAND_BUS) private readonly commandBus: CommandBus,
  ) {}

  async handle(event: AuthSessionCreatedEvent): Promise<void> {
    const email = Email.of(event.email);
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      return;
    }

    await this.commandBus.dispatch(
      new CreateUserCommand(event.id, event.name, event.email, event.token, event.provider, event.photo),
    );
  }
}
