import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

type GetUserLoginResponse = {
  user: { id: string; name: string; email: string };
  token: string;
  refreshToken: string;
};

export default class GetUserLoginQueryResponse extends QueryResponse {
  private constructor(user: GetUserLoginResponse) {
    super(user);
  }

  static from(user: GetUserLoginResponse): GetUserLoginQueryResponse {
    return new GetUserLoginQueryResponse(user);
  }
}
