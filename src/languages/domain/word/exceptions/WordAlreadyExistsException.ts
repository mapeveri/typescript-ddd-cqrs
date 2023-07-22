import DomainException from '@src/shared/domain/exceptions/domainException';

export default class WordAlreadyExistsException extends DomainException {
  constructor(public message: string = '', public code: string = 'word_already_exists') {
    super(message, 500, code);
  }
}
