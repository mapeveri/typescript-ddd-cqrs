import DomainException from '@src/shared/domain/exceptions/domainException';

export default class ExpressionAlreadyExistsException extends DomainException {
  constructor(expressionId: string) {
    super(`Expression with id ${expressionId} already exists`, 500, 'expression_already_exists');
  }
}
