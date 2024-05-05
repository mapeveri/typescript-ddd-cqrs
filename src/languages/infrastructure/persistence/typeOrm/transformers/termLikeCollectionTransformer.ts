import { ValueTransformer } from 'typeorm';
import TermLikeCollection from '@src/languages/domain/term/termLikeCollection';
import TermLike, { TermLikePrimitives } from '@src/languages/domain/term/termLike';

export default class TermLikeCollectionTransformer implements ValueTransformer {
  to(value: TermLikeCollection): string {
    return JSON.stringify(value);
  }

  from(value: string): TermLikeCollection {
    const parsedValue = JSON.parse(value);
    const termLikes = parsedValue.terms.map((item: any) => {
      const termLike: TermLikePrimitives = {
        userId: item.userId,
        name: item.name,
        photo: item.photo,
      };

      return TermLike.fromPrimitives(termLike);
    });
    return TermLikeCollection.fromPrimitives(termLikes);
  }
}
