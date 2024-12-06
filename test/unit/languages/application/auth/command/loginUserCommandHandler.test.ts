import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import LoginUserCommandHandler from '@src/languages/application/auth/command/loginUserCommandHandler';
import { LoginUserCommandMother } from './loginUserCommandMother';
import LoginException from '@src/shared/domain/auth/loginException';
import { SocialAuthenticatorMock } from '@test/unit/shared/domain/auth/socialAuthenticatorMock';
import LoginUserCommand from '@src/languages/application/auth/command/loginUserCommand';

describe('Given a LoginUserCommandHandler to handle', () => {
  let socialAuthenticator: SocialAuthenticatorMock;
  let handler: LoginUserCommandHandler;

  const prepareDependencies = () => {
    socialAuthenticator = new SocialAuthenticatorMock();
  };

  const initHandler = () => {
    handler = new LoginUserCommandHandler(socialAuthenticator);

    jest.useFakeTimers();
  };

  const clean = () => {
    socialAuthenticator.clean();
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

    it('should raise an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(LoginException);
    });
  });

  describe('When the login is success', () => {
    let command: LoginUserCommand;

    function startScenario() {
      command = LoginUserCommandMother.random();
      socialAuthenticator.add(true);
    }

    beforeEach(startScenario);

    it('should be all ok', async () => {
      await handler.execute(command);
    });
  });
});
