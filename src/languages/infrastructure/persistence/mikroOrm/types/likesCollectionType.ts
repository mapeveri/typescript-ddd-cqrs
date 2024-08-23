import { JsonType } from '@mikro-orm/core';
import TermLike, { TermLikePrimitives } from '@src/languages/domain/term/termLike';

export class LikesCollectionType extends JsonType {
  convertToDatabaseValue(value: TermLike[]): string {
    if (!value) {
      return '[]';
    }

    return JSON.stringify(value);
  }

  convertToJSValue(value: TermLikePrimitives[] | null): TermLike[] {
    const termLikes = value;
    if (!termLikes) return [];

    return termLikes.map((termLike) => TermLike.fromPrimitives(termLike)) || [];
  }

  getColumnType() {
    return 'jsonb';
  }
}
