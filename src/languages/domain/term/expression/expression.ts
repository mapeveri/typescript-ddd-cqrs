import CountryId from '../../country/countryId';
import UserId from '../../user/userId';
import ExpressionTermCollection from './expressionTermCollection';
import ExpressionCreatedEvent from './expressionCreatedEvent';
import Term from '@src/languages/domain/term/term';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';
import TermId from '@src/languages/domain/term/termId';
import TermLike, { TermLikePrimitives } from '@src/languages/domain/term/termLike';
import { ExpressionTermPrimitives } from '@src/languages/domain/term/expression/expressionTerm';

export type ExpressionPrimitives = {
  id: string;
  languageId: string;
  countryId: string;
  terms: ExpressionTermPrimitives[];
  userId: string;
  likes: TermLikePrimitives[];
};

export default class Expression extends Term {
  constructor(
    id: TermId,
    languageId: string,
    type: TermType,
    countryId: CountryId,
    userId: UserId,
    likes: TermLike[],
    private terms: ExpressionTermCollection,
  ) {
    super(id, languageId, type, countryId, userId, likes);
  }

  getTerms(): ExpressionTermCollection {
    return this.terms;
  }

  static create(
    id: TermId,
    languageId: string,
    countryId: CountryId,
    terms: ExpressionTermCollection,
    userId: UserId,
  ): Expression {
    const expression = new this(id, languageId, TermType.of(TermTypeEnum.EXPRESSION), countryId, userId, [], terms);
    expression.record(
      new ExpressionCreatedEvent(id.toString(), languageId, countryId.toString(), userId.toString(), terms.toArray()),
    );

    return expression;
  }

  toPrimitives(): ExpressionPrimitives {
    return {
      id: this.getId().toString(),
      languageId: this.getLanguageId(),
      countryId: this.getCountryId().toString(),
      terms: this.terms.toArray(),
      userId: this.getUserId().toString(),
      likes: this.getLikes().map((like: TermLike) => like.toPrimitives()),
    };
  }
}
