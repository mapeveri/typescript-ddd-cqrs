import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

type GetUserSocialLoginResponse = {
  user: { id: string; name: string; email: string };
  token: string;
  refreshToken: string;
};

export default class GetUserSocialLoginQueryResponse extends QueryResponse {
  private constructor(user: GetUserSocialLoginResponse) {
    super(user);
  }

  static from(user: GetUserSocialLoginResponse): GetUserSocialLoginQueryResponse {
    return new GetUserSocialLoginQueryResponse(user);
  }
}
