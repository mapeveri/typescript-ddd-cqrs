import { AggregateRoot } from '../../../shared/domain/aggregate/aggregateRoot';
import CountryId from '../country/valueObjects/countryId';
import UserId from '../user/valueObjects/userId';
import WordCreatedEvent from './domainEvents/wordCreatedEvent';
import WordId from './valueObjects/wordId';

export interface WordTerm {
  title: string;
  description: string;
  example: string;
  taggedWords: Array<string>;
}

export default class Word extends AggregateRoot {
  id: WordId;
  languageId: string;
  countryId: CountryId;
  terms: WordTerm[];
  userId: UserId;

  constructor(id: WordId, languageId: string, countryId: CountryId, terms: WordTerm[], userId: UserId) {
    super();

    this.id = id;
    this.languageId = languageId;
    this.countryId = countryId;
    this.terms = terms;
    this.userId = userId;
  }

  static create(id: WordId, languageId: string, countryId: CountryId, terms: WordTerm[], userId: UserId): Word {
    const word = new this(id, languageId, countryId, terms, userId);
    word.record(new WordCreatedEvent(id.toString(), languageId, countryId.toString(), userId.toString(), terms));
    return word;
  }

  toObject(): object {
    return {
      id: this.id.toString(),
      languageId: this.languageId,
      countryId: this.countryId.toString(),
      terms: this.terms,
      user: this.userId.toString(),
    };
  }
}
