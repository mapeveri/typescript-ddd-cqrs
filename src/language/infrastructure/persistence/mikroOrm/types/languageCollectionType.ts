import { JsonType } from '@mikro-orm/core';
import { LanguagePrimitives } from '@src/language/domain/country/language';
import LanguageCollection from '@src/language/domain/country/languageCollection';

export class LanguageCollectionType extends JsonType {
  convertToDatabaseValue(value: LanguageCollection): string {
    if (!value) {
      return '[]';
    }

    return JSON.stringify(value.toArray());
  }

  convertToJSValue(value: LanguagePrimitives[] | null): LanguageCollection {
    return LanguageCollection.fromPrimitives(value || []);
  }

  getColumnType() {
    return 'jsonb';
  }
}
