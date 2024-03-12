import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUser/loginUserCommandHandler';
import { LoginUserCommandMother } from './loginUserCommandMother';
import LoginException from '@src/languages/domain/user/loginException';
import { AuthSessionRepositoryMock } from '@test/unit/languages/domain/auth/authSessionRepositoryMock';
import { SocialAuthenticatorMock } from '@test/unit/languages/domain/auth/socialAuthenticatorMock';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { AuthSessionMother } from '@test/unit/languages/domain/auth/authSessionMother';
import { AuthSessionIdMother } from '@test/unit/languages/domain/auth/authSessionIdMother';
import { SessionMother } from '@test/unit/languages/domain/auth/sessionMother';
import { AuthSessionCreatedEventMother } from '@test/unit/languages/domain/auth/authSessionCreatedEventMother';

describe('LoginUserCommandHandler', () => {
  let repository: AuthSessionRepositoryMock;
  let socialAuthenticator: SocialAuthenticatorMock;
  let eventBus: EventBusMock;
  let loginUserCommandHandler: LoginUserCommandHandler;

  beforeEach(() => {
    repository = new AuthSessionRepositoryMock();
    socialAuthenticator = new SocialAuthenticatorMock();
    eventBus = new EventBusMock();

    loginUserCommandHandler = new LoginUserCommandHandler(repository, socialAuthenticator, eventBus);

    jest.useFakeTimers();
  });

  describe('execute', () => {
    it('should login failed and not save auth session nor publish an event', async () => {
      const command = LoginUserCommandMother.random();
      socialAuthenticator.returnOnAuthenticate(false);

      await expect(loginUserCommandHandler.execute(command)).rejects.toThrowError(LoginException);

      socialAuthenticator.shouldAuthenticate(command.token);
      repository.shouldNotStore();
      eventBus.shouldNotPublish();
    });

    it('should login, save auth session and publish an event', async () => {
      const command = LoginUserCommandMother.random();
      const authSession = AuthSessionMother.random({
        id: AuthSessionIdMother.random(command.id),
        session: SessionMother.random({
          provider: command.provider,
          token: command.token,
          email: command.email,
          name: command.name,
        }),
      });
      const userAuthenticatedEvent = AuthSessionCreatedEventMother.createFromLoginUserCommand(command);
      socialAuthenticator.returnOnAuthenticate(true);

      await loginUserCommandHandler.execute(command);

      socialAuthenticator.shouldAuthenticate(command.token);
      repository.shouldStoreWith(authSession);
      eventBus.shouldPublish([userAuthenticatedEvent]);
    });
  });
});
