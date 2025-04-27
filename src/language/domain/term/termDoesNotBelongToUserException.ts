import ConflictException from '@src/shared/domain/exceptions/conflictException';

export default class TermDoesNotBelongToUserException extends ConflictException {
  constructor(id: string) {
    super(`Term with id ${id} does not belong to the user`, 'term_does_not_belong_to_user');
  }
}
