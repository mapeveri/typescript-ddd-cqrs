import TermType from '@src/languages/domain/term/termType';
import TermId from '@src/languages/domain/term/termId';
import CountryId from '@src/languages/domain/country/countryId';
import UserId from '@src/languages/domain/user/userId';
import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import TermLike from '@src/languages/domain/term/termLike';
import TermLikeAddedEvent from '@src/languages/domain/term/termLikeAddedEvent';
import TermDislikedEvent from '@src/languages/domain/term/termDislikedEvent';
import TermLikeId from '@src/languages/domain/term/termLikeId';
import { Uuid } from '@src/shared/domain/valueObjects/uuid';

export default abstract class Term extends AggregateRoot {
  id: TermId;
  languageId: string;
  type: TermType;
  countryId: CountryId;
  userId: UserId;
  likes: TermLike[];

  protected constructor(
    id: TermId,
    languageId: string,
    type: TermType,
    countryId: CountryId,
    userId: UserId,
    likes: TermLike[],
  ) {
    super();

    this.id = id;
    this.languageId = languageId;
    this.type = type;
    this.countryId = countryId;
    this.userId = userId;
    this.likes = likes;
  }

  abstract toPrimitives(): unknown;

  addLike(userId: UserId, name: string, photo: string): void {
    const termLikeId = Uuid.fromString(`${this.id.toString()}${userId.toString()}`).toString();
    const like = new TermLike(TermLikeId.of(termLikeId), userId, this.id, name, photo);

    if (this.hasLike(like)) return;
    this.likes.push(like);

    const termLike = like.toPrimitives();
    this.record(new TermLikeAddedEvent(this.id.toString(), termLike.userId, termLike.name, termLike.photo));
  }

  dislike(userId: UserId, name: string, photo: string): void {
    const termLikeId = Uuid.fromString(`${this.id.toString()}${userId.toString()}`).toString();
    const like = new TermLike(TermLikeId.of(termLikeId), userId, this.id, name, photo);

    if (!this.hasLike(like)) return;
    this.removeLike(like);

    const termLike = like.toPrimitives();
    this.record(new TermDislikedEvent(this.id.toString(), termLike.userId));
  }

  private hasLike(like: TermLike): boolean {
    return this.likes.some((termLike: TermLike) => termLike.hasSameId(like));
  }

  private removeLike(termLike: TermLike): void {
    this.likes = this.likes.filter((like: TermLike) => !like.hasSameId(termLike));
  }
}
