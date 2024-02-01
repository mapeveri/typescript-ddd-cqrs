import ConflictException from '@src/shared/domain/exceptions/conflictException';

export default class ExpressionAlreadyExistsException extends ConflictException {
  constructor(id: string) {
    super(`Expression with id ${id} already exists`, 'expression_already_exists');
  }
}
