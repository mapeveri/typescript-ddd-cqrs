import { ValueObjectType } from '@src/shared/infrastructure/persistence/mikroOrm/types/valueObjectType';
import CollaboratorId from '@src/language/domain/collaborator/collaboratorId';

export class CollaboratorIdType extends ValueObjectType<string> {
  constructor() {
    super(CollaboratorId);
  }

  getColumnType() {
    return 'uuid';
  }
}
