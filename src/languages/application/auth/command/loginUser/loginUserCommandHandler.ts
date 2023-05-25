import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import LoginUserCommand from './loginUserCommand';
import { SocialLogin } from '@src/languages/domain/user/auth';
import LoginException from '@src/languages/domain/user/exceptions/loginException';
import UserAuthenticatedEvent from '@src/languages/domain/user/domainEvents/userAuthenticatedEvent';

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
