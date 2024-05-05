import TermLikeCollection from '@src/languages/domain/term/termLikeCollection';
import { TermLikeParams } from '@src/languages/domain/term/termLike';
import TermLikeMother from '@test/unit/languages/domain/term/termLikeMother';

export default class TermLikeCollectionMother {
  static random(termLikes: Array<TermLikeParams>): TermLikeCollection {
    return TermLikeCollection.of(termLikes ?? [TermLikeMother.random()]);
  }
}
