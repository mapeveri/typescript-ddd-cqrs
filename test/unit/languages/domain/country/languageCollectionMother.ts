import LanguageCollection from '@src/language/domain/country/languageCollection';
import LanguageMother from './languageMother';
import { LanguagePrimitives } from '@src/language/domain/country/language';

export default class LanguageCollectionMother {
  static random(languages: Array<LanguagePrimitives>): LanguageCollection {
    return LanguageCollection.of(languages ?? [LanguageMother.random().toPrimitives()]);
  }
}
