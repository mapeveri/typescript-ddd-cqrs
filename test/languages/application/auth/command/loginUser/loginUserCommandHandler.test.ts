import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUser/loginUserCommandHandler';
import { LoginUserCommandMother } from './loginUserCommandMother';
import LoginException from '@src/languages/domain/user/exceptions/loginException';
import { SocialLoginMock } from '@test/languages/domain/auth/socialLoginMock';
import { EventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';
import { AuthSessionCreatedEventMother } from '@test/languages/domain/auth/domainEvents/authSessionCreatedEventMother';
import { AuthSessionRepositoryMock } from '@test/languages/domain/auth/authSessionRepositoryMock';
import { AuthSessionMother } from '@test/languages/domain/auth/authSessionMother';
import { AuthSessionIdMother } from '@test/languages/domain/auth/valueObjects/authSessionIdMother';
import { SessionMother } from '@test/languages/domain/auth/valueObjects/sessionMother';

describe('LoginUserCommandHandler', () => {
  let repository: AuthSessionRepositoryMock;
  let socialLogin: SocialLoginMock;
  let eventBus: EventBusMock;
  let loginUserCommandHandler: LoginUserCommandHandler;

  beforeEach(() => {
    repository = new AuthSessionRepositoryMock();
    socialLogin = new SocialLoginMock();
    eventBus = new EventBusMock();

    loginUserCommandHandler = new LoginUserCommandHandler(repository, socialLogin, eventBus);

    jest.useFakeTimers();
  });

  describe('execute', () => {
    it('should login failed and not save auth session nor publish an event', async () => {
      const command = LoginUserCommandMother.random();
      socialLogin.returnOnLogin(false);

      await expect(loginUserCommandHandler.execute(command)).rejects.toThrowError(LoginException);

      socialLogin.expectLoginCalledWith(command.token);
      repository.expectSaveNotCalledWith();
      eventBus.expectPublishNotCalled();
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
      socialLogin.returnOnLogin(true);

      await loginUserCommandHandler.execute(command);

      socialLogin.expectLoginCalledWith(command.token);
      repository.expectSaveCalledWith(authSession);
      eventBus.expectPublishCalledWith([userAuthenticatedEvent]);
    });
  });
});
