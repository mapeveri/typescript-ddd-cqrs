import { AggregateRoot } from '../../../shared/domain/aggregate/aggregateRoot';
import User from '../user/user';
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
  user: User;

  constructor(id: string, languageId: string, countryId: string, terms: WordTerm[], user: User) {
    super();

    this.id = id;
    this.languageId = languageId;
    this.countryId = countryId;
    this.terms = terms;
    this.user = user;
  }

  static create(id: string, languageId: string, countryId: string, terms: WordTerm[], user: User): Word {
    const word = new this(id, languageId, countryId, terms, user);
    word.record(new WordCreatedEvent(id, languageId, countryId, user.id.toString(), terms));
    return word;
  }

  toObject(): object {
    return {
      id: this.id,
      languageId: this.languageId,
      countryId: this.countryId,
      terms: this.terms,
      user: this.user.toObject(),
    };
  }
}
