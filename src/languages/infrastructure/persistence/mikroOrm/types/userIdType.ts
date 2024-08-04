import UserId from '@src/languages/domain/user/userId';
import { ValueObjectType } from '@src/shared/infrastructure/persistence/mikroOrm/types/valueObjectType';

export class UserIdType extends ValueObjectType<string> {
  constructor() {
    super(UserId);
  }

  getColumnType() {
    return 'varchar';
  }
}
