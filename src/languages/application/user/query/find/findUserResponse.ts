import User from '@src/languages/domain/user/user';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';

export default class FindUserResponse extends QueryResponse {
  private constructor(user?: object) {
    super(user);
  }

  static fromUser(user: User | null): FindUserResponse {
    return new FindUserResponse(user?.toPrimitives());
  }
}
