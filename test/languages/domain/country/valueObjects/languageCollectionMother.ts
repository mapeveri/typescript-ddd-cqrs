import LanguageCollection from '@src/languages/domain/country/valueObjects/languageCollection';
import LanguageMother from './languageMother';
import { LanguagePrimitives } from '@src/languages/domain/country/valueObjects/language';

export default class LanguageCollectionMother {
  static random(languages: Array<LanguagePrimitives>): LanguageCollection {
    return LanguageCollection.of(languages ?? [LanguageMother.random().toPrimitives()]);
  }
}
