import DomainException from '@src/shared/domain/exceptions/domainException';

export default class InvalidUserIdException extends DomainException {
  constructor(userId: string) {
    super(`Invalid user id ${userId}`, 'invalid_user_id');
  }
}
