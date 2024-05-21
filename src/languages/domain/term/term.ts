import TermType from '@src/languages/domain/term/termType';
import TermId from '@src/languages/domain/term/termId';
import CountryId from '@src/languages/domain/country/countryId';
import UserId from '@src/languages/domain/user/userId';
import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import TermLikeCollection from '@src/languages/domain/term/termLikeCollection';
import TermLike from '@src/languages/domain/term/termLike';
import TermLikeAddedEvent from '@src/languages/domain/term/termLikeAddedEvent';
import TermDislikedEvent from '@src/languages/domain/term/termDislikedEvent';

export default abstract class Term extends AggregateRoot {
  id: TermId;
  languageId: string;
  type: TermType;
  countryId: CountryId;
  userId: UserId;
  likes: TermLikeCollection;

  protected constructor(
    id: TermId,
    languageId: string,
    type: TermType,
    countryId: CountryId,
    userId: UserId,
    likes: TermLikeCollection,
  ) {
    super();

    this.id = id;
    this.languageId = languageId;
    this.type = type;
    this.countryId = countryId;
    this.userId = userId;
    this.likes = likes;
  }

  addLike(like: TermLike): void {
    if (this.likes.has(like)) return;
    this.likes.add(like);

    const termLike = like.toPrimitives();
    this.record(new TermLikeAddedEvent(this.id.toString(), termLike.userId, termLike.name, termLike.photo));
  }

  dislike(like: TermLike): void {
    if (!this.likes.has(like)) return;
    this.likes.remove(like);

    const termLike = like.toPrimitives();
    this.record(new TermDislikedEvent(this.id.toString(), termLike.userId));
  }
}
