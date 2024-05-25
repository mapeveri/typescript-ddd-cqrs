import { ValueTransformer } from 'typeorm';
import TermLike from '@src/languages/domain/term/termLike';

export default class TemLikeCollectionTransformer implements ValueTransformer {
  to(value: TermLike[]): string {
    return JSON.stringify({ termLikes: value.map((like: TermLike) => like.toPrimitives()) });
  }

  from(value: string): TermLike[] {
    const parsedValue = JSON.parse(value);
    return parsedValue.termLikes.map((item: any) => {
      return TermLike.fromPrimitives({
        id: item.id,
        userId: item.userId,
        termId: item.termId,
        name: item.name,
        photo: item.photo,
      });
    });
  }
}
