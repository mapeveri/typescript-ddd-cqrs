import UserId from '../../../../domain/user/valueObjects/userId';
import { QueryHandler } from '../../../../../shared/domain/buses/queryBus/queryHandler';
import QueryResponse from '../../../../../shared/domain/buses/queryBus/queryResponse';
import UserRepository from '../../../../domain/user/userRepository';
import FindUserQuery from './findUserQuery';

export default class FindUserQueryHandler implements QueryHandler {
  constructor(private userRepository: UserRepository) {}

  async handle(query: FindUserQuery): Promise<QueryResponse> {
    const user = await this.userRepository.findById(new UserId(query.id));
    return new QueryResponse(user?.toObject());
  }
}
