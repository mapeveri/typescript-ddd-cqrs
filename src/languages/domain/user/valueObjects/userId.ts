import { Uuid } from '@src/shared/domain/valueObjects/uuid';
import InvalidUserIdException from '../exceptions/invalidUserIdException';

export default class UserId extends Uuid {
  validateValue(id: string, email: string): void {
    const userEmailId = Uuid.fromString(email).toString();
    if (userEmailId !== id) {
      throw new InvalidUserIdException();
    }
  }
}
