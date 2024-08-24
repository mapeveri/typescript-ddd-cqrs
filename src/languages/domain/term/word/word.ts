import CountryId from '../../country/countryId';
import UserId from '../../user/userId';
import WordCreatedEvent from './wordCreatedEvent';
import WordTermCollection from './wordTermCollection';
import Term from '@src/languages/domain/term/term';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';
import TermId from '@src/languages/domain/term/termId';
import TermLike, { TermLikePrimitives } from '@src/languages/domain/term/termLike';
import { WordTermPrimitives } from '@src/languages/domain/term/word/wordTerm';

type WordPrimitives = {
  id: string;
  languageId: string;
  type: string;
  countryId: string;
  terms: WordTermPrimitives[];
  userId: string;
  likes: TermLikePrimitives[];
};

export default class Word extends Term {
  terms: WordTermCollection;

  constructor(
    id: TermId,
    languageId: string,
    type: TermType,
    countryId: CountryId,
    terms: WordTermCollection,
    userId: UserId,
    likes: TermLike[],
  ) {
    super(id, languageId, type, countryId, userId, likes);

    this.terms = terms;
  }

  static create(id: TermId, languageId: string, countryId: CountryId, terms: WordTermCollection, userId: UserId): Word {
    const word = new this(id, languageId, TermType.of(TermTypeEnum.WORD), countryId, terms, userId, []);
    word.record(
      new WordCreatedEvent(id.toString(), languageId, countryId.toString(), userId.toString(), terms.toArray()),
    );
    return word;
  }

  toPrimitives(): WordPrimitives {
    return {
      id: this.id.toString(),
      languageId: this.languageId,
      type: this.type.toString(),
      countryId: this.countryId.toString(),
      terms: this.terms.toArray(),
      userId: this.userId.toString(),
      likes: this.likes.map((like: TermLike) => like.toPrimitives()),
    };
  }
}
