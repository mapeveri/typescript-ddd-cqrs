import { beforeEach, beforeAll, describe, expect, it, vi } from 'vitest';
import GetUserSocialLoginQueryHandler from '@src/account/application/auth/query/getUserSocialLoginQueryHandler';
import { GetUserSocialLoginQueryMother } from './getUserSocialLoginQueryMother';
import LoginException from '@src/account/domain/auth/loginException';
import { SocialAuthenticationVerifierMock } from '@test/unit/account/domain/auth/socialAuthenticationVerifierMock';
import GetUserSocialLoginQuery from '@src/account/application/auth/query/getUserSocialLoginQuery';
import { UserAuthenticatorMock } from '@test/unit/account/domain/auth/userAuthenticatorMock';
import UserDoesNotExistsException from '@src/account/domain/user/userDoesNotExistsException';
import { UserRepositoryMock } from '@test/unit/account/domain/user/userRepositoryMock';
import { UserMother } from '@test/unit/account/domain/user/userMother';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';

describe('Given a GetUserSocialLoginQueryHandler to handle', () => {
  let userRepository: UserRepositoryMock;
  let socialAuthenticationVerifier: SocialAuthenticationVerifierMock;
  let userAuthenticator: UserAuthenticatorMock;
  let handler: GetUserSocialLoginQueryHandler;

  const EMAIL = 'test@test.com';
  const ID = '4a4df157-8ab8-50af-bb39-88e8ce29eb16';
  const NAME = 'test';
  const TOKEN = '123';
  const REFRESH_TOKEN = '1234';

  const prepareDependencies = () => {
    userRepository = new UserRepositoryMock();
    socialAuthenticationVerifier = new SocialAuthenticationVerifierMock();
    userAuthenticator = new UserAuthenticatorMock();
  };

  const initHandler = () => {
    handler = new GetUserSocialLoginQueryHandler(userRepository, socialAuthenticationVerifier, userAuthenticator);

    vi.useFakeTimers();
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

  describe('When the user does not exists', () => {
    let query: GetUserSocialLoginQuery;

    function startScenario() {
      query = GetUserSocialLoginQueryMother.random();
      socialAuthenticationVerifier.add(false);
    }

    beforeEach(startScenario);

    it('should raise an exception', async () => {
      await expect(handler.execute(query)).rejects.toThrowError(UserDoesNotExistsException);
    });
  });

  describe('When the login fail', () => {
    let query: GetUserSocialLoginQuery;

    function startScenario() {
      query = GetUserSocialLoginQueryMother.random();
      const user = UserMother.random({ id: UserIdMother.random(query.id), email: query.email });
      userRepository.add(user);
      socialAuthenticationVerifier.add(false);
    }

    beforeEach(startScenario);

    it('should raise an exception', async () => {
      await expect(handler.execute(query)).rejects.toThrowError(LoginException);
    });
  });

  describe('When the login is success', () => {
    let query: GetUserSocialLoginQuery;

    function startScenario() {
      query = GetUserSocialLoginQueryMother.random({
        id: ID,
        email: EMAIL,
        name: NAME,
      });
      const user = UserMother.random({ id: UserIdMother.random(query.id), email: query.email });
      userRepository.add(user);
      socialAuthenticationVerifier.add(true);
      userAuthenticator.add({ token: '123', refreshToken: '1234' });
    }

    beforeEach(startScenario);

    it('should be all ok', async () => {
      const response = await handler.execute(query);
      expect(response.content).toEqual({
        user: { name: NAME, email: EMAIL, id: ID },
        token: TOKEN,
        refreshToken: REFRESH_TOKEN,
      });
    });
  });
});
