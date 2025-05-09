import TermType from '@src/language/domain/term/termType';
import TermId from '@src/language/domain/term/termId';
import CountryId from '@src/language/domain/country/countryId';
import UserId from '@src/account/domain/user/userId';
import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import TermLike from '@src/language/domain/term/termLike';
import TermLikeAddedEvent from '@src/language/domain/term/termLikeAddedEvent';
import TermDislikedEvent from '@src/language/domain/term/termDislikedEvent';
import TermLikeId from '@src/language/domain/term/termLikeId';
import TermDeletedEvent from './termDeletedEvent';
import CollaboratorId from '@src/language/domain/collaborator/collaboratorId';

export default abstract class Term extends AggregateRoot {
  constructor(
    protected id: TermId,
    protected languageId: string,
    protected type: TermType,
    protected countryId: CountryId,
    protected userId: UserId,
    protected likes: TermLike[],
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

  addLike(termLikeId: string, userId: string, name: string, photo: string): void {
    const like = new TermLike(TermLikeId.of(termLikeId), CollaboratorId.of(userId), this.id, name, photo);

    if (this.hasLike(like)) return;
    this.likes.push(like);

    const termLike = like.toPrimitives();
    this.record(new TermLikeAddedEvent(this.id.toString(), termLike.userId, termLike.name, termLike.photo));
  }

  dislike(termLikeId: string, userId: string, name: string, photo: string): void {
    const like = new TermLike(TermLikeId.of(termLikeId), UserId.of(userId), this.id, name, photo);

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
