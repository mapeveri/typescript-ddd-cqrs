import UserId from '@src/account/domain/user/userId';
import { CountryIdMother } from '../../country/countryIdMother';
import CreateExpressionCommand from '@src/languages/application/term/command/expression/createExpressionCommand';
import Expression from '@src/languages/domain/term/expression/expression';
import ExpressionTerm from '@src/languages/domain/term/expression/expressionTerm';
import ExpressionTermMother, { ExpressionTermMotherProps } from './expressionTermMother';
import ExpressionTermCollectionMother from './expressionTermCollectionMother';
import faker from 'faker';
import CountryId from '@src/languages/domain/country/countryId';
import ExpressionTermCollection from '@src/languages/domain/term/expression/expressionTermCollection';
import { UserIdMother } from '@test/unit/account/domain/user/userIdMother';
import TermId from '@src/languages/domain/term/termId';
import TermType, { TermTypeEnum } from '@src/languages/domain/term/termType';
import { TermIdMother } from '@test/unit/languages/domain/term/termIdMother';
import TermLike from '@src/languages/domain/term/termLike';
import TermLikeMother from '@test/unit/languages/domain/term/termLikeMother';

interface ExpressionMotherProps {
  id?: TermId;
  languageId?: string;
  countryId?: CountryId;
  terms: ExpressionTermCollection;
  userId: UserId;
  likes: TermLike[];
}

export default class ExpressionMother {
  static random(props?: ExpressionMotherProps): Expression {
    const { id, languageId, countryId, terms, userId, likes } = props ?? {};

    return new Expression(
      id ?? TermIdMother.random(),
      languageId ?? faker.address.countryCode(),
      TermType.of(TermTypeEnum.EXPRESSION),
      countryId ?? CountryIdMother.random(),
      userId ?? UserIdMother.random(),
      likes ?? [TermLikeMother.random()],
      terms ?? ExpressionTermCollectionMother.random([]),
    );
  }

  static createFromCreateExpressionCommand(command: CreateExpressionCommand): Expression {
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
      UserIdMother.random(command.userId),
      [],
      ExpressionTermCollectionMother.random(
        terms?.map((term) => term.toPrimitives()) ?? [ExpressionTermMother.random().toPrimitives()],
      ),
    );
  }
}
