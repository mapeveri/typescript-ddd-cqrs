import DomainException from '../../../../shared/domain/exceptions/domainException';

export default class InvalidUserIdException extends DomainException {
  constructor(public message: string = 'Invalid user id', public code: string = 'invalid_user_id') {
    super(message, 400, code);
  }
}
