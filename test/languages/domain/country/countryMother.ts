import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import Country, { Language } from '@src/languages/domain/country/country';

export default class CountryMother {
  static create({
    id = '4750c610-9058-4ce3-9f5d-a8c0373b6958',
    name = 'default_name',
    iso = 'default_iso',
    languages = [{ name: 'default_language', languageId: 'default_language_id' }] as Language[],
  } = {}): Country {
    return new Country(id, name, iso, languages);
  }

  static createFromCreateCountryCommand(command: CreateCountryCommand): Country {
    const languages = command.languages.map((language: { [key: string]: string }): Language => {
      return { name: language['name'], languageId: language['language_id'] };
    });
    return new Country(command.id, command.name, command.iso, languages);
  }
}
