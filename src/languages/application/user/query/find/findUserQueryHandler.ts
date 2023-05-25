import UserRepository from '@src/languages/domain/user/userRepository';
import { QueryHandler } from '@src/shared/domain/buses/queryBus/queryHandler';
import FindUserQuery from './findUserQuery';
import QueryResponse from '@src/shared/domain/buses/queryBus/queryResponse';
import UserId from '@src/languages/domain/user/valueObjects/userId';

export default class FindUserQueryHandler implements QueryHandler {
  constructor(private userRepository: UserRepository) {}

  async handle(query: FindUserQuery): Promise<QueryResponse> {
    const user = await this.userRepository.findById(new UserId(query.id));
    return new QueryResponse(user?.toObject());
  }
}
