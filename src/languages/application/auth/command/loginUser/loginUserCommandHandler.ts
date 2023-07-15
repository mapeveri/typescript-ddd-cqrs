import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import LoginUserCommand from './loginUserCommand';
import { SocialLogin } from '@src/languages/domain/auth/socialLogin';
import LoginException from '@src/languages/domain/user/exceptions/loginException';
import AuthSession from '@src/languages/domain/auth/authSession';
import Session from '@src/languages/domain/auth/valueObjects/session';
import AuthSessionId from '@src/languages/domain/auth/valueObjects/authSessionId';
import { AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';

export default class LoginUserCommandHandler implements CommandHandler {
  constructor(
    private authSessionRepository: AuthSessionRepository,
    private socialLogin: SocialLogin,
    private eventBus: EventBus
  ) {}

  async handle(command: LoginUserCommand): Promise<void> {
    const isValid: boolean = await this.socialLogin.login(command.token);
    if (!isValid) {
      throw new LoginException();
    }

    const authSessionId = AuthSessionId.of(command.id);
    const session = Session.of({
      name: command.name,
      email: command.email,
      provider: command.provider,
      token: command.token,
      photo: command.photo,
    });
    const authSession = AuthSession.create(authSessionId, session);
    await this.authSessionRepository.save(authSession);

    await this.eventBus.publish(authSession.pullDomainEvents());
  }
}
