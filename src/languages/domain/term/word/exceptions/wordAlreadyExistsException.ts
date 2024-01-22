import DomainException from '@src/shared/domain/exceptions/domainException';

export default class WordAlreadyExistsException extends DomainException {
  constructor(wordId: string) {
    super(`Word with id ${wordId} already exists`, 500, 'word_already_exists');
  }
}
