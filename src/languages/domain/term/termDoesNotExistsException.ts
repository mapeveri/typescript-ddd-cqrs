import NotFoundException from '@src/shared/domain/exceptions/notFoundException';

export default class TermDoesNotExistsException extends NotFoundException {
  constructor(termId: string) {
    super(`Term ${termId} does not exists`, 'term_does_not_exists');
  }
}
