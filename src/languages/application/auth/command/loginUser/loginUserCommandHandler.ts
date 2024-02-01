import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import LoginUserCommand from './loginUserCommand';
import LoginException from '@src/languages/domain/user/loginException';
import AuthSession from '@src/languages/domain/auth/authSession';
import Session from '@src/languages/domain/auth/session';
import AuthSessionId from '@src/languages/domain/auth/authSessionId';
import { AUTH_SESSION_REPOSITORY, AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import { SOCIAL_AUTHENTICATOR, SocialAuthenticator } from '@src/languages/domain/auth/socialAuthenticator';

@CommandHandler(LoginUserCommand)
export default class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject(AUTH_SESSION_REPOSITORY) private readonly authSessionRepository: AuthSessionRepository,
    @Inject(SOCIAL_AUTHENTICATOR) private readonly socialAuthenticator: SocialAuthenticator,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: LoginUserCommand): Promise<void> {
    await this.guardIsValidLogin(command);

    const authSession = this.getAuthSession(command);
    await this.authSessionRepository.save(authSession);

    void this.eventBus.publish(authSession.pullDomainEvents());
  }

  private async guardIsValidLogin(command: LoginUserCommand) {
    const isValid: boolean = await this.socialAuthenticator.login(command.token);
    if (!isValid) {
      throw new LoginException();
    }
  }

  private getAuthSession(command: LoginUserCommand) {
    const authSessionId = AuthSessionId.of(command.id);
    const session = Session.of({
      name: command.name,
      email: command.email,
      provider: command.provider,
      token: command.token,
      photo: command.photo,
    });

    return AuthSession.create(authSessionId, session);
  }
}
