import CountryId from '../../country/countryId';
import UserId from '@src/account/domain/user/userId';
import WordCreatedEvent from './wordCreatedEvent';
import WordTermCollection from './wordTermCollection';
import Term from '@src/language/domain/term/term';
import TermType, { TermTypeEnum } from '@src/language/domain/term/termType';
import TermId from '@src/language/domain/term/termId';
import TermLike, { TermLikePrimitives } from '@src/language/domain/term/termLike';
import { WordTermPrimitives } from '@src/language/domain/term/word/wordTerm';
import TermDoesNotBelongToUserException from '@src/language/domain/term/termDoesNotBelongToUserException';
import WordUpdatedEvent from '@src/language/domain/term/word/wordUpdatedEvent';

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

  static create(id: string, languageId: string, countryId: string, terms: WordTermPrimitives[], userId: string): Word {
    const word = new this(
      TermId.of(id),
      languageId,
      TermType.of(TermTypeEnum.WORD),
      CountryId.of(countryId),
      UserId.of(userId),
      [],
      WordTermCollection.of(terms),
    );

    word.record(new WordCreatedEvent(id, languageId, countryId, userId, terms));

    return word;
  }

  update(userId: string, languageId: string, countryId: string, terms: WordTermPrimitives[]): void {
    if (!this.userId.equals(UserId.of(userId))) {
      throw new TermDoesNotBelongToUserException(this.id.toString());
    }

    this.languageId = languageId;
    this.countryId = CountryId.of(countryId);
    this.terms = WordTermCollection.of(terms);

    this.record(new WordUpdatedEvent(this.id.toString(), languageId, countryId, userId, terms));
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
