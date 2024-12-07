import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import GetUserLoginQueryHandler from '@src/languages/application/auth/query/getUserLoginQueryHandler';
import { GetUserLoginQueryMother } from './getUserLoginQueryMother';
import LoginException from '@src/shared/domain/auth/loginException';
import { SocialAuthenticationVerifierMock } from '@test/unit/shared/domain/auth/socialAuthenticationVerifierMock';
import GetUserLoginQuery from '@src/languages/application/auth/query/getUserLoginQuery';
import { UserAuthenticatorMock } from '@test/unit/shared/domain/auth/userAuthenticatorMock';

describe('Given a GetUserLoginQueryHandler to handle', () => {
  let socialAuthenticationVerifier: SocialAuthenticationVerifierMock;
  let userAuthenticator: UserAuthenticatorMock;
  let handler: GetUserLoginQueryHandler;

  const EMAIL = 'test@test.com';
  const ID = '4a4df157-8ab8-50af-bb39-88e8ce29eb16';
  const NAME = 'test';
  const TOKEN = '123';
  const REFRESH_TOKEN = '1234';

  const prepareDependencies = () => {
    socialAuthenticationVerifier = new SocialAuthenticationVerifierMock();
    userAuthenticator = new UserAuthenticatorMock();
  };

  const initHandler = () => {
    handler = new GetUserLoginQueryHandler(socialAuthenticationVerifier, userAuthenticator);

    jest.useFakeTimers();
  };

  const clean = () => {
    socialAuthenticationVerifier.clean();
    userAuthenticator.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When the login fail', () => {
    let command: GetUserLoginQuery;

    function startScenario() {
      command = GetUserLoginQueryMother.random();
      socialAuthenticationVerifier.add(false);
    }

    beforeEach(startScenario);

    it('should raise an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(LoginException);
    });
  });

  describe('When the login is success', () => {
    let command: GetUserLoginQuery;

    function startScenario() {
      command = GetUserLoginQueryMother.random({
        id: ID,
        email: EMAIL,
        name: NAME,
      });
      socialAuthenticationVerifier.add(true);
      userAuthenticator.add({ token: '123', refreshToken: '1234' });
    }

    beforeEach(startScenario);

    it('should be all ok', async () => {
      const response = await handler.execute(command);
      expect(response.content).toEqual({
        user: { name: NAME, email: EMAIL, id: ID },
        token: TOKEN,
        refreshToken: REFRESH_TOKEN,
      });
    });
  });
});
