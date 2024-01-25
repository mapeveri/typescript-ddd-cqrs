import CountryId from '../../country/valueObjects/countryId';
import UserId from '../../user/valueObjects/userId';
import ExpressionTermCollection from './expressionTermCollection';
import ExpressionCreatedEvent from './expressionCreatedEvent';
import Term from '@src/languages/domain/term/term';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';
import TermId from '@src/languages/domain/term/termId';

export default class Expression extends Term {
  terms: ExpressionTermCollection;

  constructor(id: TermId, languageId: string, countryId: CountryId, terms: ExpressionTermCollection, userId: UserId) {
    super(id, languageId, TermType.of(TermTypeEnum.EXPRESSION), countryId, userId);

    this.terms = terms;
  }

  static create(
    id: TermId,
    languageId: string,
    countryId: CountryId,
    terms: ExpressionTermCollection,
    userId: UserId,
  ): Expression {
    const expression = new this(id, languageId, countryId, terms, userId);
    expression.record(
      new ExpressionCreatedEvent(id.toString(), languageId, countryId.toString(), userId.toString(), terms.toArray()),
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
