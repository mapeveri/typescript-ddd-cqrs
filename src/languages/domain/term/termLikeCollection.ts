import TermLike, { TermLikePrimitives } from '@src/languages/domain/term/termLike';

export default class TermLikeCollection {
  private constructor(private termLikes: Array<TermLike>) {}

  add(like: TermLike): void {
    this.termLikes.push(like);
  }

  remove(termLike: TermLike): void {
    this.termLikes = this.termLikes.filter((like: TermLike) => !like.hasSameUserIdAs(termLike));
  }

  has(termLike: TermLike): boolean {
    return this.termLikes.some((like: TermLike) => like.hasSameUserIdAs(termLike));
  }

  static of(primitiveTermLikes: Array<TermLikePrimitives>): TermLikeCollection {
    const termLikes = primitiveTermLikes.map((termLike: TermLikePrimitives): TermLike => {
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
