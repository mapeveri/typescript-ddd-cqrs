import { JsonType } from '@mikro-orm/core';
import { WordTermPrimitives } from '@src/language/domain/term/word/wordTerm';
import WordTermCollection from '@src/language/domain/term/word/wordTermCollection';

export class WordTermCollectionType extends JsonType {
  convertToDatabaseValue(value: WordTermCollection): string {
    if (!value) {
      return '[]';
    }

    return JSON.stringify(value.toArray());
  }

  convertToJSValue(value: WordTermPrimitives[] | null): WordTermCollection {
    return WordTermCollection.fromPrimitives(value || []);
  }

  getColumnType() {
    return 'jsonb';
  }
}
