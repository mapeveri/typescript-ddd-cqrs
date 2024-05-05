import UserId from '@src/languages/domain/user/userId';

export type TermLikeParams = {
  userId: UserId;
  name: string;
  photo: string;
};

export type TermLikePrimitives = {
  userId: string;
  name: string;
  photo: string;
};

export default class TermLike {
  private constructor(private readonly userId: UserId, private readonly name: string, private readonly photo: string) {}

  static of(termLike: TermLikeParams): TermLike {
    return new TermLike(termLike.userId, termLike.name, termLike.photo);
  }

  static fromPrimitives(termLike: TermLikePrimitives): TermLike {
    return new TermLike(UserId.fromPrimitives(termLike.userId) as UserId, termLike.name, termLike.photo);
  }

  toPrimitives(): TermLikePrimitives {
    return {
      userId: this.userId.toString(),
      name: this.name,
      photo: this.photo,
    };
  }
}
