import GetUserSocialLoginQuery from './getUserSocialLoginQuery';
import LoginException from '@src/account/domain/auth/loginException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import {
  SOCIAL_AUTHENTICATION_VERIFIER,
  SocialAuthenticationVerifier,
} from '@src/account/domain/auth/socialAuthenticationVerifier';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';
import { USER_AUTHENTICATOR, UserAuthenticator } from '@src/account/domain/auth/userAuthenticator';
import GetUserSocialLoginQueryResponse from '@src/account/application/auth/query/getUserSocialLoginQueryResponse';
import UserId from '@src/account/domain/user/userId';
import UserRepository, { USER_REPOSITORY } from '@src/account/domain/user/userRepository';
import UserDoesNotExistsException from '@src/account/domain/user/userDoesNotExistsException';

@QueryHandler(GetUserSocialLoginQuery)
export default class GetUserSocialLoginQueryHandler implements IQueryHandler<GetUserSocialLoginQuery> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(SOCIAL_AUTHENTICATION_VERIFIER) private readonly socialAuthenticationVerifier: SocialAuthenticationVerifier,
    @Inject(USER_AUTHENTICATOR) private readonly userAuthenticator: UserAuthenticator,
  ) {}

  async execute(query: GetUserSocialLoginQuery): Promise<GetUserSocialLoginQueryResponse> {
    await this.guardUserExists(query.id);
    await this.verifySocialLogin(query);

    const user = { id: query.id, name: query.name, email: query.email };
    const data = this.userAuthenticator.sign(user);

    return GetUserSocialLoginQueryResponse.from({
      user,
      token: data.token,
      refreshToken: data.refreshToken,
    });
  }

  private async guardUserExists(id: string): Promise<void> {
    const userId = UserId.of(id);
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserDoesNotExistsException(userId.toString());
    }
  }

  private async verifySocialLogin(query: GetUserSocialLoginQuery): Promise<void> {
    const isValid: boolean = await this.socialAuthenticationVerifier.verify(query.token);
    if (!isValid) {
      throw new LoginException(query.email);
    }
  }
}
