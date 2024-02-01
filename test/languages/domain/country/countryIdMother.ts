import CountryId from '@src/languages/domain/country/countryId';
import faker from 'faker';

export class CountryIdMother {
  static random(id?: string): CountryId {
    return CountryId.of(id ?? faker.datatype.uuid());
  }
}
