import { Type } from '@mikro-orm/core';
import { LanguagePrimitives } from '@src/languages/domain/country/language';
import LanguageCollection from '@src/languages/domain/country/languageCollection';

export class LanguageCollectionType extends Type<LanguageCollection, LanguagePrimitives[]> {
  convertToDatabaseValue(value: LanguageCollection | undefined): LanguagePrimitives[] {
    if (!value) {
      return [];
    }
    return value.toArray();
  }

  convertToJSValue(value: LanguagePrimitives[] | null): LanguageCollection {
    return LanguageCollection.fromPrimitives(value || []);
  }

  getColumnType() {
    return 'jsonb';
  }
}
