import { beforeEach, describe, expect, it } from '@jest/globals';
import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUser/loginUserCommandHandler';
import { LoginUserCommandMother } from './loginUserCommandMother';
import { UserAuthenticatedEventMother } from '@test/languages/domain/user/domainEvents/userAuthenticatedEventMother';
import LoginException from '@src/languages/domain/user/exceptions/loginException';
import { SocialLoginMock } from '@test/languages/domain/auth/socialLoginMock';
import { EventBusMock } from '@test/shared/domain/buses/eventBus/eventBusMock';

describe('LoginUserCommandHandler.test handle', () => {
  let socialLogin: SocialLoginMock;
  let eventBus: EventBusMock;
  let loginUserCommandHandler: LoginUserCommandHandler;

  beforeEach(() => {
    socialLogin = new SocialLoginMock();
    eventBus = new EventBusMock();

    loginUserCommandHandler = new LoginUserCommandHandler(socialLogin, eventBus);
  });

  it('should fail login and not publish an event', async () => {
    const command = LoginUserCommandMother.random();
    socialLogin.login.mockResolvedValueOnce(false);

    await expect(loginUserCommandHandler.handle(command)).rejects.toThrowError(LoginException);

    socialLogin.expectLoginCalledWith(command.token);
    eventBus.expectPublishNotCalled();
  });

  it('should login and publish an event', async () => {
    const command = LoginUserCommandMother.random();
    const userAuthenticatedEvent = UserAuthenticatedEventMother.createFromLoginUserCommand(command);
    socialLogin.login.mockResolvedValueOnce(true);

    await loginUserCommandHandler.handle(command);

    socialLogin.expectLoginCalledWith(command.token);
    eventBus.expectPublishCalledWith([userAuthenticatedEvent]);
  });
});
