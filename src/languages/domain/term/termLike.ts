import UserId from '@src/languages/domain/user/userId';
import TermId from '@src/languages/domain/term/termId';

export type TermLikePrimitives = {
  userId: string;
  termId: string;
  name: string;
  photo: string;
};

export default class TermLike {
  private readonly userId: UserId;
  private readonly termId: TermId;
  private readonly name: string;
  private readonly photo: string;

  constructor(userId: UserId, termId: TermId, name: string, photo: string) {
    this.userId = userId;
    this.termId = termId;
    this.name = name;
    this.photo = photo;
  }

  hasSameUserIdAs(termLike: TermLike): boolean {
    return this.userId.equals(termLike.userId);
  }

  toPrimitives(): TermLikePrimitives {
    return {
      userId: this.userId.toString(),
      termId: this.termId.toString(),
      name: this.name,
      photo: this.photo,
    };
  }
}
