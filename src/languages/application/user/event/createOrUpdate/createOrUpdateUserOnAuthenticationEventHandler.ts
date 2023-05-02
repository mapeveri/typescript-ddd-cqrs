import { CommandBus } from '../../../../../shared/domain/buses/commandBus/commandBus';
import { EventHandler } from '../../../../../shared/domain/buses/eventBus/eventHandler';
import UserAuthenticatedEvent from '../../../../domain/user/domainEvents/userAuthenticatedEvent';
import UserRepository from '../../../../domain/user/userRepository';
import CreateUserCommand from '../../command/create/createUserCommand';
import UpdateUserCommand from '../../command/update/updateUserCommand';

export default class CreateOrUpdateUserOnAuthenticationEventHandler implements EventHandler {
  constructor(private userRepository: UserRepository, private commandBus: CommandBus) {}

  async handle(event: UserAuthenticatedEvent): Promise<void> {
    const user = await this.userRepository.findById(event.id);
    if (null === user) {
      await this.commandBus.dispatch(
        new CreateUserCommand(event.id, event.name, event.email, event.token, event.provider, event.photo)
      );
      return;
    }

    await this.commandBus.dispatch(new UpdateUserCommand(event.id, event.name, event.photo));
  }
}
