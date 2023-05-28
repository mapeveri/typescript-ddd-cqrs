import UserId from '../user/valueObjects/userId';
import ExpressionId from './valueObjects/expressionId';
import ExpressionTermCollection from './valueObjects/expressionTermCollection';

export default class Expression {
  id: ExpressionId;
  languageId: string;
  countryId: string;
  terms: ExpressionTermCollection;
  userId: UserId;

  constructor(
    id: ExpressionId,
    languageId: string,
    countryId: string,
    terms: ExpressionTermCollection,
    userId: UserId
  ) {
    this.id = id;
    this.languageId = languageId;
    this.countryId = countryId;
    this.terms = terms;
    this.userId = userId;
  }

  static create(
    id: ExpressionId,
    languageId: string,
    countryId: string,
    terms: ExpressionTermCollection,
    userId: UserId
  ): Expression {
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
