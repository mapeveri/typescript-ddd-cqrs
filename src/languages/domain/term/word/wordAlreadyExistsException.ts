import DomainException from '@src/shared/domain/exceptions/domainException';

export default class WordAlreadyExistsException extends DomainException {
  constructor(id: string) {
    super(`Word with id ${id} already exists`, 500, 'word_already_exists');
  }
}
