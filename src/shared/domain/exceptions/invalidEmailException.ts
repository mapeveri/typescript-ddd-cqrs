import { ConflictException } from '@nestjs/common';

export default class InvalidEmailException extends ConflictException {
  constructor(public message: string = 'Invalid email', public code: string = 'invalid_email') {
    super(message, code);
  }
}
