import CountryId from '../../country/countryId';
import UserId from '../../user/userId';
import ExpressionTermCollection from './expressionTermCollection';
import ExpressionCreatedEvent from './expressionCreatedEvent';
import Term from '@src/languages/domain/term/term';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';
import TermId from '@src/languages/domain/term/termId';
import TermLikeCollection from '@src/languages/domain/term/termLikeCollection';

export default class Expression extends Term {
  terms: ExpressionTermCollection;

  constructor(
    id: TermId,
    languageId: string,
    type: TermType,
    countryId: CountryId,
    terms: ExpressionTermCollection,
    userId: UserId,
    likes: TermLikeCollection,
  ) {
    super(id, languageId, type, countryId, userId, likes);

    this.terms = terms;
  }

  static create(
    id: TermId,
    languageId: string,
    countryId: CountryId,
    terms: ExpressionTermCollection,
    userId: UserId,
  ): Expression {
    const expression = new this(
      id,
      languageId,
      TermType.of(TermTypeEnum.EXPRESSION),
      countryId,
      terms,
      userId,
      TermLikeCollection.of([]),
    );
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
      terms: this.terms.toArray(),
      user: this.userId.toString(),
      likes: this.likes.toArray(),
    };
  }
}
