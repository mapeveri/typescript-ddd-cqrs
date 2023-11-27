import DomainException from '@src/shared/domain/exceptions/domainException';

export default class UserDoesNotExistsException extends DomainException {
  constructor(userId: string) {
    super(`User ${userId} doesn not exists`, 404, 'user_does_not_exists');
  }
}
