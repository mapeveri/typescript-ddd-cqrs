import DomainException from '@src/shared/domain/exceptions/domainException';

export default class ExpressionAlreadyExistsException extends DomainException {
  constructor(id: string) {
    super(`Expression with id ${id} already exists`, 500, 'expression_already_exists');
  }
}
