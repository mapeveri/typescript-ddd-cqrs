import DomainException from '@src/shared/domain/exceptions/domainException';

export default class ExpressionAlreadyExistsException extends DomainException {
  constructor(public message: string = '', public code: string = 'expression_already_exists') {
    super(message, 500, code);
  }
}
