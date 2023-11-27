import DomainException from '@src/shared/domain/exceptions/domainException';

export default class LoginException extends DomainException {
  constructor() {
    super('Invalid login', 403, 'invalid_login');
  }
}
