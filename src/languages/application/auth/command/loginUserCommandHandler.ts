import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import LoginUserCommand from './loginUserCommand';
import LoginException from '@src/shared/domain/auth/loginException';
import AuthSession from '@src/languages/domain/auth/authSession';
import AuthSessionId from '@src/languages/domain/auth/authSessionId';
import { AUTH_SESSION_REPOSITORY, AuthSessionRepository } from '@src/languages/domain/auth/authSessionRepository';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import { SOCIAL_AUTHENTICATOR, SocialAuthenticator } from '@src/shared/domain/auth/socialAuthenticator';

@CommandHandler(LoginUserCommand)
export default class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject(AUTH_SESSION_REPOSITORY) private readonly authSessionRepository: AuthSessionRepository,
    @Inject(SOCIAL_AUTHENTICATOR) private readonly socialAuthenticator: SocialAuthenticator,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: LoginUserCommand): Promise<void> {
    await this.guardIsValidLogin(command);

    const authSessionId = AuthSessionId.of(command.id);
    const authSession = AuthSession.create(
      authSessionId,
      command.name,
      command.email,
      command.provider,
      command.token,
      command.photo,
    );

    this.authSessionRepository.save(authSession);

    void this.eventBus.publish(authSession.pullDomainEvents());
  }

  private async guardIsValidLogin(command: LoginUserCommand): Promise<void> {
    const isValid: boolean = await this.socialAuthenticator.login(command.token);
    if (!isValid) {
      throw new LoginException(command.email);
    }
  }
}
