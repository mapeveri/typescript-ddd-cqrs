import { ValueTransformer } from 'typeorm';
import TermLikeCollection from '@src/languages/domain/term/termLikeCollection';

export default class TermLikeCollectionTransformer implements ValueTransformer {
  to(value: TermLikeCollection): string {
    return JSON.stringify({ termLikes: value.toArray() });
  }

  from(value: string): TermLikeCollection {
    const parsedValue = JSON.parse(value);
    const termLikes = parsedValue.termLikes.map((item: any) => {
      return {
        userId: item.userId,
        name: item.name,
        photo: item.photo,
      };
    });
    return TermLikeCollection.fromPrimitives(termLikes);
  }
}
