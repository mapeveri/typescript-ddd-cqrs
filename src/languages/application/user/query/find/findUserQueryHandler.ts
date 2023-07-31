import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { QueryHandler } from '@src/shared/domain/buses/queryBus/queryHandler';
import FindUserQuery from './findUserQuery';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import FindUserResponse from './findUserResponse';
import { Inject } from '@src/shared/domain/injector/inject.decorator';

export default class FindUserQueryHandler implements QueryHandler {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  async handle(query: FindUserQuery): Promise<QueryResponse> {
    const user = await this.userRepository.findById(UserId.of(query.id));
    return FindUserResponse.fromUser(user);
  }
}
