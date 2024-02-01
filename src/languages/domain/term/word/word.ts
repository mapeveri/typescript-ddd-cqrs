import CountryId from '../../country/countryId';
import UserId from '../../user/userId';
import WordCreatedEvent from './wordCreatedEvent';
import WordTermCollection from './wordTermCollection';
import Term from '@src/languages/domain/term/term';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';
import TermId from '@src/languages/domain/term/termId';

export default class Word extends Term {
  terms: WordTermCollection;

  constructor(
    id: TermId,
    languageId: string,
    type: TermType,
    countryId: CountryId,
    terms: WordTermCollection,
    userId: UserId,
  ) {
    super(id, languageId, type, countryId, userId);

    this.terms = terms;
  }

  static create(id: TermId, languageId: string, countryId: CountryId, terms: WordTermCollection, userId: UserId): Word {
    const word = new this(id, languageId, TermType.of(TermTypeEnum.WORD), countryId, terms, userId);
    word.record(
      new WordCreatedEvent(id.toString(), languageId, countryId.toString(), userId.toString(), terms.toArray()),
    );
    return word;
  }

  toPrimitives(): object {
    return {
      id: this.id.toString(),
      languageId: this.languageId,
      countryId: this.countryId.toString(),
      terms: this.terms,
      user: this.userId.toString(),
    };
  }
}
