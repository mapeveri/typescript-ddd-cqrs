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
import TermDeletedEvent from './termDeletedEvent';

export default abstract class Term extends AggregateRoot {
  constructor(
    private id: TermId,
    private languageId: string,
    private type: TermType,
    private countryId: CountryId,
    private userId: UserId,
    private likes: TermLike[],
  ) {
    super();
  }

  public getId(): TermId {
    return this.id;
  }

  public getType(): TermType {
    return this.type;
  }

  public getLanguageId(): string {
    return this.languageId;
  }

  public getCountryId(): CountryId {
    return this.countryId;
  }

  public getUserId(): UserId {
    return this.userId;
  }

  public getLikes(): TermLike[] {
    return this.likes;
  }

  abstract toPrimitives(): unknown;

  delete(): void {
    this.record(new TermDeletedEvent(this.id.toString(), this.type.toString()));
  }

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
