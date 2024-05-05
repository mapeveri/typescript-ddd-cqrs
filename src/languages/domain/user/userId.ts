import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import InvalidUserIdException from './invalidUserIdException';

export default class UserId extends Uuid {
  static of(value: string): UserId {
    return super.of(value) as UserId;
  }

  static fromPrimitives(value: string): UserId {
    return super.fromPrimitives(value) as UserId;
  }

  guardIsValid(email: string): void {
    const userId = Uuid.fromString(email).toString();
    if (userId !== this.value) {
      throw new InvalidUserIdException(userId);
    }
  }
}
