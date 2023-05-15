import { CommandBus } from '../../../../../shared/domain/buses/commandBus/commandBus';
import { EventHandler } from '../../../../../shared/domain/buses/eventBus/eventHandler';
import UserAuthenticatedEvent from '../../../../domain/user/domainEvents/userAuthenticatedEvent';
import UserRepository from '../../../../domain/user/userRepository';
import CreateUserCommand from '../../command/create/createUserCommand';
import UpdateUserCommand from '../../command/update/updateUserCommand';
import User from '../../../../domain/user/user';
import InvalidUserIdException from '../../../../domain/user/exceptions/invalidUserIdException';

export default class CreateOrUpdateUserOnAuthenticationEventHandler implements EventHandler {
  constructor(private userRepository: UserRepository, private commandBus: CommandBus) {}

  async handle(event: UserAuthenticatedEvent): Promise<void> {
    const userId = event.id;
    if (false === User.validateId(userId, event.email)) {
      throw new InvalidUserIdException();
    }

    const user = await this.userRepository.findById(userId);
    if (null === user) {
      await this.commandBus.dispatch(
        new CreateUserCommand(userId, event.name, event.email, event.token, event.provider, event.photo)
      );
      return;
    }

    await this.commandBus.dispatch(new UpdateUserCommand(userId, event.name, event.photo));
  }
}
