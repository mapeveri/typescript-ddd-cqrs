import { SocialLogin } from '../../../../domain/user/auth';
import LoginException from '../../../../domain/user/exceptions/loginException';
import { CommandHandler } from '../../../../../shared/domain/buses/commandBus/commandHandler';
import LoginUserCommand from './loginUserCommand';
import { EventBus } from '../../../../../shared/domain/buses/eventBus/eventBus';
import UserAuthenticatedEvent from '../../../../domain/user/domainEvents/userAuthenticatedEvent';

export default class LoginUserCommandHandler implements CommandHandler {
  constructor(private socialLogin: SocialLogin, private eventBus: EventBus) {}

  async handle(command: LoginUserCommand): Promise<void> {
    const isValid: boolean = await this.socialLogin.login(command.token);
    if (!isValid) {
      throw new LoginException();
    }

    await this.eventBus.publish([
      new UserAuthenticatedEvent(
        command.id,
        command.name,
        command.email,
        command.token,
        command.provider,
        command.photo
      ),
    ]);
  }
}
