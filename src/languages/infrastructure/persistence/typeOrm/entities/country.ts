import { EntitySchema } from 'typeorm';
import Country from '../../../../domain/country/country';

export default new EntitySchema<Country>({
  name: Country.name,
  tableName: 'countries',
  target: Country,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
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
