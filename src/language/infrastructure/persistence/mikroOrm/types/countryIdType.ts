import CountryId from '@src/language/domain/country/countryId';
import { ValueObjectType } from '@src/shared/infrastructure/persistence/mikroOrm/types/valueObjectType';

export class CountryIdType extends ValueObjectType<string> {
  constructor() {
    super(CountryId);
  }

  getColumnType() {
    return 'uuid';
  }
}
