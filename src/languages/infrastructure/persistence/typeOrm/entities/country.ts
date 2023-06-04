import { EntitySchema } from 'typeorm';
import Country from '@src/languages/domain/country/country';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import { ValueObjectTransformer } from '@src/shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import LanguageCollectionTransformer from '../transformers/languageCollectionTransformer';
import LanguageCollection from '@src/languages/domain/country/valueObjects/languageCollection';

export default new EntitySchema<Country>({
  name: Country.name,
  tableName: 'countries',
  target: Country,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(CountryId),
    },
    name: {
      type: String,
    },
    iso: {
      type: String,
    },
    languages: {
      type: 'json',
      transformer: new LanguageCollectionTransformer(),
      default: new LanguageCollection([]),
    },
  },
});
