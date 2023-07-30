import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { EventHandler } from '@src/shared/domain/buses/eventBus/eventHandler';
import CreateUserCommand from '../../command/create/createUserCommand';
import UpdateUserCommand from '../../command/update/updateUserCommand';
import AuthSessionCreatedEvent from '@src/languages/domain/auth/domainEvents/authSessionCreatedEvent';
import { Inject } from '@nestjs/common';

export default class CreateOrUpdateUserOnAuthSessionCreatedEventHandler implements EventHandler {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
    @Inject(COMMAND_BUS) private commandBus: CommandBus
  ) {}

  async handle(event: AuthSessionCreatedEvent): Promise<void> {
    const userId = UserId.fromIdWithEmailVerification(event.id, event.email);
    const user = await this.userRepository.findById(userId);
    if (null === user) {
      await this.commandBus.dispatch(
        new CreateUserCommand(userId.toString(), event.name, event.email, event.token, event.provider, event.photo)
      );
      return;
    }

    await this.commandBus.dispatch(new UpdateUserCommand(userId.toString(), event.name, event.photo));
  }
}