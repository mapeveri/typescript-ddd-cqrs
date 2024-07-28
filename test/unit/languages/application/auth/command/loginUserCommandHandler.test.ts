import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUserCommandHandler';
import { LoginUserCommandMother } from './loginUserCommandMother';
import LoginException from '@src/shared/domain/auth/loginException';
import { AuthSessionRepositoryMock } from '@test/unit/languages/domain/auth/authSessionRepositoryMock';
import { SocialAuthenticatorMock } from '@test/unit/shared/domain/auth/socialAuthenticatorMock';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { AuthSessionMother } from '@test/unit/languages/domain/auth/authSessionMother';
import { AuthSessionIdMother } from '@test/unit/languages/domain/auth/authSessionIdMother';
import { SessionMother } from '@test/unit/languages/domain/auth/sessionMother';
import { AuthSessionCreatedEventMother } from '@test/unit/languages/domain/auth/authSessionCreatedEventMother';

describe('Given a LoginUserCommandHandler', () => {
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

  describe('When the login fail', () => {
    it('should not save auth session', async () => {
      const command = LoginUserCommandMother.random();
      socialAuthenticator.returnOnAuthenticate(false);

      await expect(loginUserCommandHandler.execute(command)).rejects.toThrowError(LoginException);

      socialAuthenticator.shouldAuthenticate(command.token);
      
      expect(repository.stored()).toHaveLength(0);
    });

    it('should not publish any events', async () => {
      const command = LoginUserCommandMother.random();
      socialAuthenticator.returnOnAuthenticate(false);

      await expect(loginUserCommandHandler.execute(command)).rejects.toThrowError(LoginException);

      socialAuthenticator.shouldAuthenticate(command.token);
      eventBus.shouldNotPublish();
    });
  });

  describe('When the login is success', () => {
    const command = LoginUserCommandMother.random();

    it('should save auth session', async () => {
      const authSession = AuthSessionMother.random({
        id: AuthSessionIdMother.random(command.id),
        session: SessionMother.random({
          provider: command.provider,
          token: command.token,
          email: command.email,
          name: command.name,
        }),
      });
      socialAuthenticator.returnOnAuthenticate(true);

      await loginUserCommandHandler.execute(command);

      socialAuthenticator.shouldAuthenticate(command.token);
      
      expect(repository.stored()).toHaveLength(1);
      expect(repository.stored()[0].toPrimitives()).toEqual(authSession.toPrimitives());
    });

    it('should publish an event', async () => {
      const userAuthenticatedEvent = AuthSessionCreatedEventMother.createFromLoginUserCommand(command);
      socialAuthenticator.returnOnAuthenticate(true);

      await loginUserCommandHandler.execute(command);

      socialAuthenticator.shouldAuthenticate(command.token);
      eventBus.shouldPublish([userAuthenticatedEvent]);
    });
  });
});
