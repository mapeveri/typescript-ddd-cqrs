import faker from 'faker';
import CollaboratorId from '@src/language/domain/collaborator/collaboratorId';
import Collaborator from '@src/language/domain/collaborator/collaborator';
import { CollaboratorIdMother } from '@test/unit/languages/domain/collaborator/collaboratorIdMother';

interface CollaboratorMotherProps {
  id?: CollaboratorId;
  name?: string;
  photo?: string;
  interests?: string[];
}

export class CollaboratorMother {
  static random(props?: CollaboratorMotherProps): Collaborator {
    const { id, name, photo, interests } = props ?? {};

    return new Collaborator(
      id ?? CollaboratorIdMother.random(),
      name ?? faker.name.findName(),
      photo ?? faker.image.imageUrl(),
      interests ?? ['test'],
    );
  }
}
