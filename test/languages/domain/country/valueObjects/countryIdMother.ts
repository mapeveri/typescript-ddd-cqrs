import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import faker from 'faker';

export class CountryIdMother {
  static random(id?: string): CountryId {
    return new CountryId(id ?? faker.datatype.uuid());
  }
}
