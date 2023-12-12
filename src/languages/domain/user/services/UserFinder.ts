import UserRepository from '@src/languages/domain/user/userRepository';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import User from '@src/languages/domain/user/user';
import UserDoesNotExistsException from '@src/languages/domain/user/exceptions/userDoesNotExistsException';

export default class UserFinder {
  constructor(private readonly userRepository: UserRepository) {}

  async find(userId: UserId): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (null === user) {
      throw new UserDoesNotExistsException(userId.toString());
    }

    return user;
  }
}
