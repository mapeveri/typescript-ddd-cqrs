import DomainException from '../../../../shared/domain/exceptions/domainException';

export default class UserDoesNotExistsException extends DomainException {
  constructor(public message: string = 'User doesn not exists') {
    super(message, 401);
  }
}
