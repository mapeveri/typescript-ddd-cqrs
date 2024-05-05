import TermLikeCollection from '@src/languages/domain/term/termLikeCollection';
import TermLikeMother from '@test/unit/languages/domain/term/termLikeMother';
import { TermLikePrimitives } from '@src/languages/domain/term/termLike';

export default class TermLikeCollectionMother {
  static random(termLikes: Array<TermLikePrimitives>): TermLikeCollection {
    return TermLikeCollection.of(termLikes ?? [TermLikeMother.random()]);
  }
}
