import { Uuid } from '../../../../shared/domain/valueObjects/uuid';
import InvalidUserIdException from '../exceptions/invalidUserIdException';

export default class UserId extends Uuid {
  ensureIsValid(id: string, email: string): void {
    const userEmailId = Uuid.generateFromString(email).toString();
    if (userEmailId !== id) {
      throw new InvalidUserIdException();
    }
  }
}
