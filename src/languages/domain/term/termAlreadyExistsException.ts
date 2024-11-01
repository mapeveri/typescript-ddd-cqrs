import ConflictException from '@src/shared/domain/exceptions/conflictException';

export default class TermAlreadyExistsException extends ConflictException {
  constructor(id: string) {
    super(`Term with id ${id} already exists`, 'term_already_exists');
  }
}
