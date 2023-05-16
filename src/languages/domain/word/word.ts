import { AggregateRoot } from '../../../shared/domain/aggregate/aggregateRoot';
import UserId from '../user/valueObjects/userId';
import WordCreatedEvent from './domainEvents/wordCreatedEvent';

export interface WordTerm {
  title: string;
  description: string;
  example: string;
  taggedWords: Array<string>;
}

export default class Word extends AggregateRoot {
  id: string;
  languageId: string;
  countryId: string;
  terms: WordTerm[];
  userId: UserId;

  constructor(id: string, languageId: string, countryId: string, terms: WordTerm[], userId: UserId) {
    super();

    this.id = id;
    this.languageId = languageId;
    this.countryId = countryId;
    this.terms = terms;
    this.userId = userId;
  }

  static create(id: string, languageId: string, countryId: string, terms: WordTerm[], userId: UserId): Word {
    const word = new this(id, languageId, countryId, terms, userId);
    word.record(new WordCreatedEvent(id, languageId, countryId, userId.toString(), terms));
    return word;
  }

  toObject(): object {
    return {
      id: this.id,
      languageId: this.languageId,
      countryId: this.countryId,
      terms: this.terms,
      user: this.userId.toString(),
    };
  }
}
