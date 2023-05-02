import TermInterface from '../term/termInterface';
import User from '../user/user';

export default class Word {
  id: string;
  language_id: string;
  country_id: string;
  terms: Array<TermInterface>;
  user: User;

  constructor(id: string, language_id: string, country_id: string, terms: Array<TermInterface>, user: User) {
    this.id = id;
    this.language_id = language_id;
    this.country_id = country_id;
    this.terms = terms;
    this.user = user;
  }

  static create(id: string, language_id: string, country_id: string, terms: Array<TermInterface>, user: User): Word {
    return new this(id, language_id, country_id, terms, user);
  }

  toObject(): object {
    return {
      id: this.id,
      language_id: this.language_id,
      country_id: this.country_id,
      terms: this.terms,
      user: this.user.toObject(),
    };
  }
}
