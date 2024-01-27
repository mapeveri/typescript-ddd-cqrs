import DomainException from '@src/shared/domain/exceptions/domainException';

export default class UnauthorizedException extends DomainException {
  constructor(public message: string, public code: string) {
    super(message, code);
  }
}
