import LanguageCollection from '@src/languages/domain/country/valueObjects/languageCollection';
import Language from '@src/languages/domain/country/valueObjects/language';
import LanguageMother from './languageMother';

export default class LanguageCollectionMother {
  static random(languages: Array<Language>): LanguageCollection {
    return new LanguageCollection(languages ?? [LanguageMother.random()]);
  }
}
