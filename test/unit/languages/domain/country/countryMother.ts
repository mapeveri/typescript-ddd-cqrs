import CreateCountryCommand from '@src/language/application/country/command/createCountryCommand';
import Country from '@src/language/domain/country/country';
import { CountryIdMother } from './countryIdMother';
import faker from 'faker';
import CountryId from '@src/language/domain/country/countryId';
import LanguageCollectionMother from './languageCollectionMother';
import Language, { LanguagePrimitives } from '@src/language/domain/country/language';
import LanguageMother from './languageMother';

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
      id ?? CountryIdMother.random(),
      name ?? faker.name.findName(),
      iso ?? faker.random.word().slice(0, 2),
      LanguageCollectionMother.random(
        languages?.map((language) => language.toPrimitives()) ?? [LanguageMother.random().toPrimitives()],
      ),
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
