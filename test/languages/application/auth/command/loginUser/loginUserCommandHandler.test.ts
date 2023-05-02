import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUser/loginUserCommandHandler';
import { LoginUserCommandMother } from './loginUserCommandMother';
import { SocialLogin } from '@src/languages/domain/user/auth';
import { EventBus } from '@src/shared/domain/buses/eventBus/eventBus';
import { UserAuthenticatedEventMother } from '@test/languages/domain/user/domainEvents/userAuthenticatedEventMother';
import LoginException from '@src/languages/domain/user/exceptions/loginException';

describe('LoginUserCommandHandler.test handle', () => {
  let socialLogin: SocialLogin;
  let eventBus: EventBus;
  let loginUserCommandHandler: LoginUserCommandHandler;

  beforeEach(() => {
    socialLogin = {
      login: jest.fn(),
    } as SocialLogin;

    eventBus = {
      register: jest.fn(),
      publish: jest.fn(),
    } as EventBus;

    loginUserCommandHandler = new LoginUserCommandHandler(socialLogin, eventBus);
  });

  it('should login faild and not publish an event', async () => {
    const command = LoginUserCommandMother.random();
    const spy = jest.spyOn(socialLogin, 'login');
    spy.mockReturnValue(Promise.resolve(false));

    await expect(loginUserCommandHandler.handle(command)).rejects.toThrowError(LoginException);

    expect(socialLogin.login).toHaveBeenCalledWith(command.token);
    expect(eventBus.publish).not.toHaveBeenCalled();
  });

  it('should login and publish an event', async () => {
    const command = LoginUserCommandMother.random();
    const userAuthenticatedEvent = UserAuthenticatedEventMother.createFromLoginUserCommand(command);
    const expectedUserAuthenticatedEvent = { ...userAuthenticatedEvent, eventId: expect.any(String) };
    const spy = jest.spyOn(socialLogin, 'login');
    spy.mockReturnValue(Promise.resolve(true));

    await loginUserCommandHandler.handle(command);

    expect(socialLogin.login).toHaveBeenCalledWith(command.token);
    expect(eventBus.publish).toHaveBeenCalledWith([expectedUserAuthenticatedEvent]);
  });
});
