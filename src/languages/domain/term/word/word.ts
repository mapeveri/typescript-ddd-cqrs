import CountryId from '../../country/valueObjects/countryId';
import UserId from '../../user/valueObjects/userId';
import WordCreatedEvent from './domainEvents/wordCreatedEvent';
import WordTermCollection from './valueObjects/wordTermCollection';
import WordId from './valueObjects/wordId';
import Term from '@src/languages/domain/term/term';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/valueObjects/termType';

export default class Word extends Term {
  terms: WordTermCollection;

  constructor(id: WordId, languageId: string, countryId: CountryId, terms: WordTermCollection, userId: UserId) {
    super(id, languageId, TermType.of(TermTypeEnum.WORD), countryId, userId);

    this.terms = terms;
  }

  static create(id: WordId, languageId: string, countryId: CountryId, terms: WordTermCollection, userId: UserId): Word {
    const word = new this(id, languageId, countryId, terms, userId);
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
