import DomainException from '@src/shared/domain/exceptions/domainException';

export default class UnauthorizedException extends DomainException {
  constructor(public message: string = 'User unauthorized', public code: string = 'user_unauthorized') {
    super(message, code);
  }
}
