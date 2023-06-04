import Language from '@src/languages/domain/country/valueObjects/language';
import LanguageCollection from '@src/languages/domain/country/valueObjects/languageCollection';
import { ValueTransformer } from 'typeorm';

export default class LanguageCollectionTransformer implements ValueTransformer {
  to(value: LanguageCollection): string {
    return JSON.stringify(value);
  }

  from(value: string): LanguageCollection {
    const parsedValue = JSON.parse(value);
    const languages = parsedValue.languages.map((language: any) => {
      return new Language(language.name, language.languageId);
    });
    return new LanguageCollection(languages);
  }
}
