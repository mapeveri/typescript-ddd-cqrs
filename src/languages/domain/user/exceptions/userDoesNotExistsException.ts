import DomainException from '@src/shared/domain/exceptions/domainException';

export default class UserDoesNotExistsException extends DomainException {
  constructor(public message: string = 'User doesn not exists', public code: string = 'user_does_not_exists') {
    super(message, 401, code);
  }
}
