import ConflictException from '@src/shared/domain/exceptions/conflictException';

export default class ExpressionAlreadyExistsException extends ConflictException {
  constructor(expressionId: string) {
    super(`Expression with id ${expressionId} already exists`, 'expression_already_exists');
  }
}
