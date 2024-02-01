import Language, { LanguagePrimitives } from '@src/languages/domain/country/language';
import LanguageCollection from '@src/languages/domain/country/languageCollection';
import { ValueTransformer } from 'typeorm';

export default class LanguageCollectionTransformer implements ValueTransformer {
  to(value: LanguageCollection): string {
    return JSON.stringify(value);
  }

  from(value: string): LanguageCollection {
    const parsedValue = JSON.parse(value);
    const languages = parsedValue.languages.map((language: any) => {
      const languageDto: LanguagePrimitives = {
        name: language.name,
        languageId: language.languageId,
      };

      return Language.fromPrimitives(languageDto);
    });
    return LanguageCollection.fromPrimitives(languages);
  }
}
