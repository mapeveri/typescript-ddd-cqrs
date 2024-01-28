import ConflictException from '@src/shared/domain/exceptions/conflictException';

export default class WordAlreadyExistsException extends ConflictException {
  constructor(id: string) {
    super(`Word with id ${id} already exists`, 'word_already_exists');
  }
}
