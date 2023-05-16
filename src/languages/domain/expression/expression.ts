import Term from '../term/term';
import UserId from '../user/valueObjects/userId';

export default class Expression {
  id: string;
  languageId: string;
  countryId: string;
  terms: Array<Term>;
  userId: UserId;

  constructor(id: string, languageId: string, countryId: string, terms: Array<Term>, userId: UserId) {
    this.id = id;
    this.languageId = languageId;
    this.countryId = countryId;
    this.terms = terms;
    this.userId = userId;
  }

  static create(id: string, languageId: string, countryId: string, terms: Array<Term>, userId: UserId): Expression {
    return new this(id, languageId, countryId, terms, userId);
  }

  toObject(): object {
    return {
      id: this.id,
      language_id: this.languageId,
      country_id: this.countryId,
      terms: this.terms,
      user: this.userId.toString(),
    };
  }
}
