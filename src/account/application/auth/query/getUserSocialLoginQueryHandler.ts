import GetUserSocialLoginQuery from './getUserSocialLoginQuery';
import LoginException from '@src/account/domain/auth/loginException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import {
  SOCIAL_AUTHENTICATION_VERIFIER,
  SocialAuthenticationVerifier,
} from '@src/account/domain/auth/socialAuthenticationVerifier';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';
import { USER_AUTHENTICATOR, UserAuthenticator } from '@src/shared/domain/auth/userAuthenticator';
import GetUserSocialLoginQueryResponse from '@src/account/application/auth/query/getUserSocialLoginQueryResponse';

@QueryHandler(GetUserSocialLoginQuery)
export default class GetUserSocialLoginQueryHandler implements IQueryHandler<GetUserSocialLoginQuery> {
  constructor(
    @Inject(SOCIAL_AUTHENTICATION_VERIFIER) private readonly socialAuthenticationVerifier: SocialAuthenticationVerifier,
    @Inject(USER_AUTHENTICATOR) private readonly userAuthenticator: UserAuthenticator,
  ) {}

  async execute(query: GetUserSocialLoginQuery): Promise<GetUserSocialLoginQueryResponse> {
    await this.verifySocialLogin(query);

    const user = { id: query.id, name: query.name, email: query.email };
    const data = this.userAuthenticator.sign(user);

    return GetUserSocialLoginQueryResponse.from({
      user,
      token: data.token,
      refreshToken: data.refreshToken,
    });
  }

  private async verifySocialLogin(query: GetUserSocialLoginQuery): Promise<void> {
    const isValid: boolean = await this.socialAuthenticationVerifier.verify(query.token);
    if (!isValid) {
      throw new LoginException(query.email);
    }
  }
}
