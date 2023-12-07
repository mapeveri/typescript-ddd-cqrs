import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import InvalidUserIdException from '../exceptions/invalidUserIdException';

export default class UserId extends Uuid {
  static of(value: string): UserId {
    return super.of(value) as UserId;
  }

  static fromEmailWithValidation(value: string, email: string): UserId {
    const instance = this.of(value);
    instance.validate(email);
    return instance;
  }

  private validate(value: string): void {
    const userId = Uuid.fromString(value).toString();
    if (userId !== this.value) {
      throw new InvalidUserIdException(userId);
    }
  }
}
