import TermType from '@src/languages/domain/term/termType';
import { ValueObjectType } from '@src/shared/infrastructure/persistence/mikroOrm/types/valueObjectType';

export class TermTypeType extends ValueObjectType<string> {
  constructor() {
    super(TermType);
  }

  getColumnType() {
    return 'varchar(30)';
  }
}
