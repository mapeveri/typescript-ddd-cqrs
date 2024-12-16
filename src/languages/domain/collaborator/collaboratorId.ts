import { Uuid } from '@src/shared/domain/valueObjects/uuid';

export default class CollaboratorId extends Uuid {
  static of(value: string): CollaboratorId {
    return super.of(value) as CollaboratorId;
  }

  static fromPrimitives(value: string): CollaboratorId {
    return super.fromPrimitives(value) as CollaboratorId;
  }
}
