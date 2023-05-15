import DomainException from './domainException';

export default class InvalidArgumentException extends DomainException {
  constructor(public message: string = 'Invalid argument', public code: string = 'invalid_argument') {
    super(message, 500, code);
  }
}
