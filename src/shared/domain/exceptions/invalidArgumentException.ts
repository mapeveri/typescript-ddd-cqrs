import ConflictException from '@src/shared/domain/exceptions/conflictException';

export default class InvalidArgumentException extends ConflictException {
  constructor(public message: string = 'Invalid argument', public code: string = 'invalid_argument') {
    super(message, code);
  }
}
