import User, { UserPrimitives } from '@src/languages/domain/user/user';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';

export default class FindUserResponse extends QueryResponse {
  private constructor(user?: UserPrimitives) {
    super(user);
  }

  static fromUser(user: User | null): FindUserResponse {
    return new FindUserResponse(user?.toPrimitives());
  }
}
