import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import FindUserQuery from './findUserQuery';
import QueryResponse from '@src/shared/domain/bus/queryBus/queryResponse';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import FindUserResponse from './findUserResponse';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { IQueryHandler, QueryHandler } from '@src/shared/domain/bus/queryBus/queryHandler';

@QueryHandler(FindUserQuery)
export default class FindUserQueryHandler implements IQueryHandler<FindUserQuery> {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(query: FindUserQuery): Promise<QueryResponse> {
    const user = await this.userRepository.findById(UserId.of(query.id));
    return FindUserResponse.fromUser(user);
  }
}
