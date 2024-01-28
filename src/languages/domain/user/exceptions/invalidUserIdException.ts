import ConflictException from '@src/shared/domain/exceptions/conflictException';

export default class InvalidUserIdException extends ConflictException {
  constructor(userId: string) {
    super(`Invalid user id ${userId}`, 'invalid_user_id');
  }
}
