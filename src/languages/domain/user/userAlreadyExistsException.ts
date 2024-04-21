import ConflictException from '@src/shared/domain/exceptions/conflictException';

export default class UserAlreadyExistsException extends ConflictException {
  constructor(id: string) {
    super(`User with id ${id} already exists`, 'user_already_exists');
  }
}
