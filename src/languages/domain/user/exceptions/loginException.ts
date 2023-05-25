import DomainException from '@src/shared/domain/exceptions/domainException';

export default class LoginException extends DomainException {
  constructor(public message: string = 'Invalid login', public code: string = 'invalid_login') {
    super(message, 401, code);
  }
}
