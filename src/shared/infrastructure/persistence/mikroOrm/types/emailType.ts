import Email from '@src/shared/domain/valueObjects/email';
import { ValueObjectType } from '@src/shared/infrastructure/persistence/mikroOrm/types/valueObjectType';

export class EmailType extends ValueObjectType<string> {
  constructor() {
    super(Email);
  }

  getColumnType(): string {
    return 'varchar(100)';
  }
}
