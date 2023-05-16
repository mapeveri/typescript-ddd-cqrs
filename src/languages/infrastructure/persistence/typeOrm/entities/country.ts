import { EntitySchema } from 'typeorm';
import Country from '../../../../domain/country/country';
import { ValueObjectTransformer } from '../../../../../shared/infrastructure/persistence/typeOrm/transformers/valueObjectTransformer';
import CountryId from '../../../../domain/country/valueObjects/countryId';

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
      type: 'simple-array',
      default: [],
    },
  },
});
