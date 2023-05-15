import DomainException from './domainException';

export default class InvalidEmailException extends DomainException {
  constructor(public message: string = 'Invalid email', public code: string = 'invalid_email') {
    super(message, 500, code);
  }
}
