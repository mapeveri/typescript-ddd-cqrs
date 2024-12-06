import { Uuid } from '@src/shared/domain/valueObjects/uuid';

export default class UserId extends Uuid {
  static of(value: string): UserId {
    return super.of(value) as UserId;
  }

  static fromPrimitives(value: string): UserId {
    return super.fromPrimitives(value) as UserId;
  }
}
