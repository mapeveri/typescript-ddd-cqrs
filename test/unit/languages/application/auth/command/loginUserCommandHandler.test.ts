import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
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
import LoginUserCommand from '@src/languages/application/auth/command/loginUserCommand';

describe('Given a LoginUserCommandHandler', () => {
  let authSessionRepository: AuthSessionRepositoryMock;
  let socialAuthenticator: SocialAuthenticatorMock;
  let eventBus: EventBusMock;
  let loginUserCommandHandler: LoginUserCommandHandler;

  const prepareDependencies = () => {
    authSessionRepository = new AuthSessionRepositoryMock();
    socialAuthenticator = new SocialAuthenticatorMock();
    eventBus = new EventBusMock();
  };

  const initHandler = () => {
    loginUserCommandHandler = new LoginUserCommandHandler(authSessionRepository, socialAuthenticator, eventBus);

    jest.useFakeTimers();
  };

  const clean = () => {
    authSessionRepository.clean();
    socialAuthenticator.clean();
    eventBus.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When the login fail', () => {
    let command: LoginUserCommand;

    function startScenario() {
      command = LoginUserCommandMother.random();
      socialAuthenticator.add(false);
    }

    beforeEach(startScenario);

    it('should not save auth session', async () => {
      await expect(loginUserCommandHandler.execute(command)).rejects.toThrowError(LoginException);

      expect(authSessionRepository.stored()).toHaveLength(0);
    });

    it('should not publish any events', async () => {
      await expect(loginUserCommandHandler.execute(command)).rejects.toThrowError(LoginException);

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the login is success', () => {
    let command: LoginUserCommand;

    function startScenario() {
      command = LoginUserCommandMother.random();
      socialAuthenticator.add(true);
    }

    beforeEach(startScenario);

    it('should save auth session', async () => {
      const authSession = AuthSessionMother.random({
        id: AuthSessionIdMother.random(command.id),
        session: SessionMother.random({
          provider: command.provider,
          token: command.token,
          email: command.email,
          photo: command.photo,
          name: command.name,
        }),
      });

      await loginUserCommandHandler.execute(command);

      expect(authSessionRepository.stored()).toHaveLength(1);
      expect(authSessionRepository.stored()[0].toPrimitives()).toEqual(authSession.toPrimitives());
    });

    it('should publish an event', async () => {
      const userAuthenticatedEvent = AuthSessionCreatedEventMother.createFromLoginUserCommand(command);

      await loginUserCommandHandler.execute(command);

      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...userAuthenticatedEvent,
      });
    });
  });
});
