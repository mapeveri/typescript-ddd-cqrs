import { beforeEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import GetUserSocialLoginQueryHandler from '@src/account/application/auth/query/getUserSocialLoginQueryHandler';
import { GetUserSocialLoginQueryMother } from './getUserSocialLoginQueryMother';
import LoginException from '@src/shared/domain/auth/loginException';
import { SocialAuthenticationVerifierMock } from '@test/unit/shared/domain/auth/socialAuthenticationVerifierMock';
import GetUserSocialLoginQuery from '@src/account/application/auth/query/getUserSocialLoginQuery';
import { UserAuthenticatorMock } from '@test/unit/shared/domain/auth/userAuthenticatorMock';

describe('Given a GetUserSocialLoginQueryHandler to handle', () => {
  let socialAuthenticationVerifier: SocialAuthenticationVerifierMock;
  let userAuthenticator: UserAuthenticatorMock;
  let handler: GetUserSocialLoginQueryHandler;

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
    handler = new GetUserSocialLoginQueryHandler(socialAuthenticationVerifier, userAuthenticator);

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
    let command: GetUserSocialLoginQuery;

    function startScenario() {
      command = GetUserSocialLoginQueryMother.random();
      socialAuthenticationVerifier.add(false);
    }

    beforeEach(startScenario);

    it('should raise an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(LoginException);
    });
  });

  describe('When the login is success', () => {
    let command: GetUserSocialLoginQuery;

    function startScenario() {
      command = GetUserSocialLoginQueryMother.random({
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
