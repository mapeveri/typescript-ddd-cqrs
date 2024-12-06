import LoginUserCommand from './loginUserCommand';
import LoginException from '@src/shared/domain/auth/loginException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import { SOCIAL_AUTHENTICATOR, SocialAuthenticator } from '@src/shared/domain/auth/socialAuthenticator';

@CommandHandler(LoginUserCommand)
export default class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
  constructor(@Inject(SOCIAL_AUTHENTICATOR) private readonly socialAuthenticator: SocialAuthenticator) {}

  async execute(command: LoginUserCommand): Promise<void> {
    await this.verifyLogin(command);
  }

  private async verifyLogin(command: LoginUserCommand): Promise<void> {
    const isValid: boolean = await this.socialAuthenticator.login(command.token);
    if (!isValid) {
      throw new LoginException(command.email);
    }
  }
}
