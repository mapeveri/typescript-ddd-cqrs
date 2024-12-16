import UserId from '@src/account/domain/user/userId';
import TermId from '@src/languages/domain/term/termId';
import TermLikeId from '@src/languages/domain/term/termLikeId';

export type TermLikePrimitives = {
  id: string;
  userId: string;
  termId: string;
  name: string;
  photo: string;
};

export default class TermLike {
  constructor(
    private readonly id: TermLikeId,
    private readonly userId: UserId,
    private readonly termId: TermId,
    private readonly name: string,
    private readonly photo: string,
  ) {}

  hasSameId(termLike: TermLike): boolean {
    return this.id.equals(termLike.id);
  }

  toPrimitives(): TermLikePrimitives {
    return {
      id: this.id.toString(),
      userId: this.userId.toString(),
      termId: this.termId.toString(),
      name: this.name,
      photo: this.photo,
    };
  }

  static fromPrimitives(termLike: TermLikePrimitives): TermLike {
    return new TermLike(
      TermLikeId.fromPrimitives(termLike.id),
      UserId.fromPrimitives(termLike.userId),
      TermId.fromPrimitives(termLike.termId),
      termLike.name,
      termLike.photo,
    );
  }
}
