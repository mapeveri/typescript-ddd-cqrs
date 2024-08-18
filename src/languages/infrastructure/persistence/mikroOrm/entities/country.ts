import { EntitySchema } from '@mikro-orm/core';
import Country from '@src/languages/domain/country/country';
import { CountryIdType } from '../types/countryIdType';
import { LanguageCollectionType } from '../types/languageCollectionType';

export const CountrySchema = new EntitySchema<Country>({
  class: Country,
  tableName: 'countries',
  properties: {
    id: {
      type: CountryIdType,
      primary: true,
    },
    name: {
      type: String,
      length: 255,
    },
    iso: {
      type: String,
      length: 10,
    },
    languages: {
      type: LanguageCollectionType,
    },
  },
});
