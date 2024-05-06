import TermLike, { TermLikePrimitives } from '@src/languages/domain/term/termLike';
import UserId from '@src/languages/domain/user/userId';

export default class TermLikeCollection {
  private constructor(private readonly termLikes: Array<TermLike>) {}

  add(userId: UserId, name: string, photo: string): void {
    this.termLikes.push(TermLike.of({ userId: userId.toString(), name, photo }));
  }

  has(userId: UserId): boolean {
    return this.termLikes.some((like: TermLike) => like.getUserId().equals(userId));
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
