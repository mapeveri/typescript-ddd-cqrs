import faker from 'faker';
import CollaboratorId from '@src/language/domain/collaborator/collaboratorId';

export class CollaboratorIdMother {
  static random(id?: string): CollaboratorId {
    return CollaboratorId.of(id ?? faker.datatype.uuid());
  }
}
