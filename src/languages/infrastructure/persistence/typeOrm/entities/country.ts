import { EntitySchema } from 'typeorm';
import Country from '@src/languages/domain/country/country';
import CountryId from '@src/languages/domain/country/countryId';
import { ValueObjectTransformer } from '@src/shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import LanguageCollectionTransformer from '../transformers/languageCollectionTransformer';
import LanguageCollection from '@src/languages/domain/country/languageCollection';

export const CountrySchema = new EntitySchema<Country>({
  name: Country.name,
  tableName: 'countries',
  target: Country,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      transformer: ValueObjectTransformer(CountryId),
    },
    name: {
      type: String,
      length: 255
    },
    iso: {
      type: String,
      length: 10
    },
    languages: {
      type: 'jsonb',
      transformer: new LanguageCollectionTransformer(),
      default: LanguageCollection.fromPrimitives([]),
    },
  },
});
