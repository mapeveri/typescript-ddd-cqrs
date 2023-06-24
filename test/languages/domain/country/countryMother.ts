import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import Country from '@src/languages/domain/country/country';
import { CountryIdMother } from './valueObjects/countryIdMother';
import faker from 'faker';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import LanguageCollectionMother from './valueObjects/languageCollectionMother';
import Language, { LanguagePrimitives } from '@src/languages/domain/country/valueObjects/language';
import LanguageMother from './valueObjects/languageMother';

interface CountryMotherProps {
  id?: CountryId;
  name?: string;
  iso?: string;
  languages?: Array<Language>;
}

export default class CountryMother {
  static random(props?: CountryMotherProps): Country {
    const { id, name, iso, languages } = props ?? {};

    return new Country(
      id ?? CountryId.random(),
      name ?? faker.name.findName(),
      iso ?? faker.random.word(),
      LanguageCollectionMother.random(languages ?? [LanguageMother.random()])
    );
  }

  static createFromCreateCountryCommand(command: CreateCountryCommand): Country {
    const languages = command.languages.map((language: LanguagePrimitives): Language => {
      return LanguageMother.random({ name: language['name'], languageId: language['languageId'] });
    });
    return this.random({
      id: CountryIdMother.random(command.id),
      name: command.name,
      iso: command.iso,
      languages: languages,
    });
  }
}
