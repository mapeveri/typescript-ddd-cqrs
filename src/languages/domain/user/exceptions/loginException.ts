import DomainException from '../../../../shared/domain/exceptions/domainException';

export default class LoginException extends DomainException {
  constructor(public message: string = 'Invalid login') {
    super(message, 401);
  }
}
