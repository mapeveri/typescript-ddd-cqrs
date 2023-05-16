import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import Country, { Language } from '@src/languages/domain/country/country';
import { CountryIdMother } from './valueObjects/countryIdMother';
import faker from 'faker';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';

interface CountryMotherProps {
  id?: CountryId;
  name?: string;
  iso?: string;
  languages?: Language[];
}

export default class CountryMother {
  static random(props?: CountryMotherProps): Country {
    const { id, name, iso, languages } = props ?? {};

    return new Country(
      id ?? CountryId.random(),
      name ?? faker.name.findName(),
      iso ?? faker.random.word(),
      languages ?? ([{ name: 'default_language', languageId: 'default_language_id' }] as Language[])
    );
  }

  static createFromCreateCountryCommand(command: CreateCountryCommand): Country {
    const languages = command.languages.map((language: { [key: string]: string }): Language => {
      return { name: language['name'], languageId: language['language_id'] };
    });
    return new Country(CountryIdMother.random(command.id), command.name, command.iso, languages);
  }
}
