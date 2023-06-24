import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import InvalidUserIdException from '../exceptions/invalidUserIdException';

export default class UserId extends Uuid {
  static of(value: string): UserId {
    return super.of(value) as UserId;
  }

  static fromEmailWithValidation(value: string, email: string): UserId {
    const id = Uuid.of(value);
    const instance = new UserId(id.value);
    instance.validateEmail(email);
    return instance;
  }

  private validateEmail(email: string): void {
    const userEmailId = Uuid.fromString(email).toString();
    if (userEmailId !== this.value) {
      throw new InvalidUserIdException();
    }
  }
}
