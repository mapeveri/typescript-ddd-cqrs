import ConflictException from '@src/shared/domain/exceptions/conflictException';

export default class WordAlreadyExistsException extends ConflictException {
  constructor(wordId: string) {
    super(`Word with id ${wordId} already exists`, 'word_already_exists');
  }
}
