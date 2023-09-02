import { EVENT_BUS, EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import LoginUserCommand from './loginUserCommand';
import { SOCIAL_LOGIN, SocialLogin } from '@src/languages/domain/auth/socialLogin';
import LoginException from '@src/languages/domain/user/exceptions/loginException';
import AuthSession from '@src/languages/domain/auth/authSession';
import Session from '@src/languages/domain/auth/valueObjects/session';
import AuthSessionId from '@src/languages/domain/auth/valueObjects/authSessionId';
import { AUTH_SESSION_REPOSITORY, AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';

@CommandHandler(LoginUserCommand)
export default class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject(AUTH_SESSION_REPOSITORY) private authSessionRepository: AuthSessionRepository,
    @Inject(SOCIAL_LOGIN) private socialLogin: SocialLogin,
    @Inject(EVENT_BUS) private eventBus: EventBus
  ) {}

  async execute(command: LoginUserCommand): Promise<void> {
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

    void this.eventBus.publish(authSession.pullDomainEvents());
  }
}
