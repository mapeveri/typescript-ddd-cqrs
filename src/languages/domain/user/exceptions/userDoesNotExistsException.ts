import NotFoundException from '@src/shared/domain/exceptions/notFoundException';

export default class UserDoesNotExistsException extends NotFoundException {
  constructor(userId: string) {
    super(`User ${userId} doesn not exists`, 'user_does_not_exists');
  }
}
