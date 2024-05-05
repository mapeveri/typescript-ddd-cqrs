import TermLike, { TermLikeParams, TermLikePrimitives } from '@src/languages/domain/term/termLike';

export default class TermLikeCollection {
  private constructor(private readonly termLikes: Array<TermLike>) {}

  static of(primitiveTermLikes: Array<TermLikeParams>): TermLikeCollection {
    const termLikes = primitiveTermLikes.map((termLike: TermLikeParams): TermLike => {
      return TermLike.of(termLike);
    });

    return new this(termLikes);
  }

  static fromPrimitives(primitiveTermLikes: Array<TermLikePrimitives>): TermLikeCollection {
    const termLikes = primitiveTermLikes.map((termLike: TermLikePrimitives): TermLike => {
      return TermLike.fromPrimitives(termLike);
    });

    return new this(termLikes);
  }

  toArray(): Array<TermLikePrimitives> {
    return this.termLikes.map((termLike: TermLike) => termLike.toPrimitives());
  }
}
