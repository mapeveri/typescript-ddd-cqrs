import GetUserLoginQuery from './getUserLoginQuery';
import LoginException from '@src/shared/domain/auth/loginException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { SOCIAL_AUTHENTICATOR, SocialAuthenticator } from '@src/shared/domain/auth/socialAuthenticator';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';
import { USER_AUTHENTICATOR, UserAuthenticator } from '@src/shared/domain/auth/userAuthenticator';
import GetUserLoginQueryResponse from '@src/languages/application/auth/query/getUserLoginQueryResponse';

@QueryHandler(GetUserLoginQuery)
export default class GetUserLoginQueryHandler implements IQueryHandler<GetUserLoginQuery> {
  constructor(
    @Inject(SOCIAL_AUTHENTICATOR) private readonly socialAuthenticator: SocialAuthenticator,
    @Inject(USER_AUTHENTICATOR) private readonly userAuthenticator: UserAuthenticator,
  ) {}

  async execute(query: GetUserLoginQuery): Promise<GetUserLoginQueryResponse> {
    await this.verifySocialLogin(query);

    const user = { id: query.id, name: query.name, email: query.email };
    const data = this.userAuthenticator.sign(user);

    return GetUserLoginQueryResponse.from({
      user,
      token: data.token,
      refreshToken: data.refreshToken,
    });
  }

  private async verifySocialLogin(query: GetUserLoginQuery): Promise<void> {
    const isValid: boolean = await this.socialAuthenticator.verify(query.token);
    if (!isValid) {
      throw new LoginException(query.email);
    }
  }
}
