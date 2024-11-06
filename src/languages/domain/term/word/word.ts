import CountryId from '../../country/countryId';
import UserId from '../../user/userId';
import WordCreatedEvent from './wordCreatedEvent';
import WordTermCollection from './wordTermCollection';
import Term from '@src/languages/domain/term/term';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';
import TermId from '@src/languages/domain/term/termId';
import TermLike, { TermLikePrimitives } from '@src/languages/domain/term/termLike';
import { WordTermPrimitives } from '@src/languages/domain/term/word/wordTerm';
import TermDoesNotBelongToUserException from '@src/languages/domain/term/termDoesNotBelongToUserException';
import WordUpdatedEvent from '@src/languages/domain/term/word/wordUpdatedEvent';

export type WordPrimitives = {
  id: string;
  languageId: string;
  countryId: string;
  terms: WordTermPrimitives[];
  userId: string;
  likes: TermLikePrimitives[];
};

export default class Word extends Term {
  constructor(
    id: TermId,
    languageId: string,
    type: TermType,
    countryId: CountryId,
    userId: UserId,
    likes: TermLike[],
    private terms: WordTermCollection,
  ) {
    super(id, languageId, type, countryId, userId, likes);
  }

  public getTerms(): WordTermCollection {
    return this.terms;
  }

  static create(id: TermId, languageId: string, countryId: CountryId, terms: WordTermCollection, userId: UserId): Word {
    const word = new this(id, languageId, TermType.of(TermTypeEnum.WORD), countryId, userId, [], terms);
    word.record(
      new WordCreatedEvent(id.toString(), languageId, countryId.toString(), userId.toString(), terms.toArray()),
    );
    return word;
  }

  update(userId: UserId, languageId: string, countryId: CountryId, terms: WordTermCollection): void {
    if (!this.userId.equals(userId)) {
      throw new TermDoesNotBelongToUserException(this.id.toString());
    }

    this.languageId = languageId;
    this.countryId = countryId;
    this.terms = terms;

    this.record(
      new WordUpdatedEvent(this.id.toString(), languageId, countryId.toString(), userId.toString(), terms.toArray()),
    );
  }

  toPrimitives(): WordPrimitives {
    return {
      id: this.getId().toString(),
      languageId: this.getLanguageId(),
      countryId: this.getCountryId().toString(),
      terms: this.terms.toArray(),
      userId: this.getUserId().toString(),
      likes: this.getLikes().map((like: TermLike) => like.toPrimitives()),
    };
  }
}
