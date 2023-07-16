import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import CountryId from '../country/valueObjects/countryId';
import UserId from '../user/valueObjects/userId';
import ExpressionId from './valueObjects/expressionId';
import ExpressionTermCollection from './valueObjects/expressionTermCollection';
import ExpressionCreatedEvent from './domainEvents/expressionCreatedEvent';

export default class Expression extends AggregateRoot {
  id: ExpressionId;
  languageId: string;
  countryId: CountryId;
  terms: ExpressionTermCollection;
  userId: UserId;

  constructor(
    id: ExpressionId,
    languageId: string,
    countryId: CountryId,
    terms: ExpressionTermCollection,
    userId: UserId
  ) {
    super();

    this.id = id;
    this.languageId = languageId;
    this.countryId = countryId;
    this.terms = terms;
    this.userId = userId;
  }

  static create(
    id: ExpressionId,
    languageId: string,
    countryId: CountryId,
    terms: ExpressionTermCollection,
    userId: UserId
  ): Expression {
    const expression = new this(id, languageId, countryId, terms, userId);
    expression.record(
      new ExpressionCreatedEvent(id.toString(), languageId, countryId.toString(), userId.toString(), terms.toArray())
    );

    return expression;
  }

  toPrimitives(): object {
    return {
      id: this.id,
      language_id: this.languageId,
      country_id: this.countryId,
      terms: this.terms,
      user: this.userId.toString(),
    };
  }
}
