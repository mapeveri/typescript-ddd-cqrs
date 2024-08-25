import TermId from '@src/languages/domain/term/termId';
import { ValueObjectType } from '@src/shared/infrastructure/persistence/mikroOrm/types/valueObjectType';

export class TermIdType extends ValueObjectType<string> {
  constructor() {
    super(TermId);
  }

  getColumnType() {
    return 'uuid';
  }
}
