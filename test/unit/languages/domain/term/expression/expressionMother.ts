import UserId from '@src/languages/domain/user/userId';
import { CountryIdMother } from '../../country/countryIdMother';
import CreateExpressionCommand from '@src/languages/application/term/command/create/createExpressionCommand';
import Expression from '@src/languages/domain/term/expression/expression';
import ExpressionTerm from '@src/languages/domain/term/expression/expressionTerm';
import ExpressionTermMother, { ExpressionTermMotherProps } from './expressionTermMother';
import ExpressionTermCollectionMother from './expressionTermCollectionMother';
import faker from 'faker';
import CountryId from '@src/languages/domain/country/countryId';
import ExpressionTermCollection from '@src/languages/domain/term/expression/expressionTermCollection';
import { UserIdMother } from '../../user/userIdMother';
import TermId from '@src/languages/domain/term/termId';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import TermLikeCollectionMother from '@test/unit/languages/domain/term/termLikeCollectionMother';
import TermLikeCollection from '@src/languages/domain/term/termLikeCollection';

interface ExpressionMotherProps {
  id?: TermId;
  languageId?: string;
  countryId?: CountryId;
  terms: ExpressionTermCollection;
  userId: UserId;
  likes: TermLikeCollection;
}

export default class ExpressionMother {
  static random(props?: ExpressionMotherProps): Expression {
    const { id, languageId, countryId, terms, userId, likes } = props ?? {};

    return new Expression(
      id ?? TermIdMother.random(),
      languageId ?? faker.datatype.uuid(),
      TermType.of(TermTypeEnum.EXPRESSION),
      countryId ?? CountryIdMother.random(),
      terms ?? ExpressionTermCollectionMother.random([]),
      userId ?? UserIdMother.random(),
      likes ?? TermLikeCollectionMother.random([]),
    );
  }

  static createFromCreateExpressionCommand(command: CreateExpressionCommand, userId: UserId): Expression {
    const terms = command.terms.map((term: { [key: string]: any }): ExpressionTerm => {
      return ExpressionTermMother.random({
        expression: term['expression'],
        description: term['description'],
        example: term['example'],
        hashtags: term['hashtags'],
      } as ExpressionTermMotherProps);
    });

    return new Expression(
      TermIdMother.random(command.id),
      command.languageId,
      TermType.of(TermTypeEnum.EXPRESSION),
      CountryIdMother.random(command.countryId),
      ExpressionTermCollectionMother.random(
        terms?.map((term) => term.toPrimitives()) ?? [ExpressionTermMother.random().toPrimitives()],
      ),
      userId,
      TermLikeCollectionMother.random([]),
    );
  }
}
