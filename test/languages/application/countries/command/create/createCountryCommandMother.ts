import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';

export default class CreateCountryCommandMother {
  static create({
    id = '4750c610-9058-4ce3-9f5d-a8c0373b6958',
    name = 'default_name',
    iso = 'default_iso',
    languages = [{ name: 'default_language', language_id: 'default_language_id' }],
  } = {}): CreateCountryCommand {
    return new CreateCountryCommand(id, name, iso, languages);
  }
}
