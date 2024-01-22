import UserId from '@src/languages/domain/user/valueObjects/userId';
import { CountryIdMother } from '../country/valueObjects/countryIdMother';
import CreateExpressionCommand from '@src/languages/application/term/command/create/createExpressionCommand';
import Expression from '@src/languages/domain/term/expression/expression';
import ExpressionTerm from '@src/languages/domain/term/expression/valueObjects/expressionTerm';
import ExpressionTermMother, { ExpressionTermMotherProps } from './valueObjects/expressionTermMother';
import { ExpressionIdMother } from './valueObjects/expressionIdMother';
import ExpressionTermCollectionMother from './valueObjects/expressionTermCollectionMother';
import faker from 'faker';
import ExpressionId from '@src/languages/domain/term/expression/valueObjects/expressionId';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import ExpressionTermCollection from '@src/languages/domain/term/expression/valueObjects/expressionTermCollection';
import { UserIdMother } from '../user/valueObjects/userIdMother';

interface ExpressionMotherProps {
  id?: ExpressionId;
  languageId?: string;
  countryId?: CountryId;
  terms: ExpressionTermCollection;
  userId: UserId;
}

export default class ExpressionMother {
  static random(props?: ExpressionMotherProps): Expression {
    const { id, languageId, countryId, terms, userId } = props ?? {};

    return new Expression(
      id ?? ExpressionIdMother.random(),
      languageId ?? faker.datatype.uuid(),
      countryId ?? CountryIdMother.random(),
      terms ?? ExpressionTermCollectionMother.random([]),
      userId ?? UserIdMother.random(),
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
      ExpressionIdMother.random(command.id),
      command.languageId,
      CountryIdMother.random(command.countryId),
      ExpressionTermCollectionMother.random(
        terms?.map((term) => term.toPrimitives()) ?? [ExpressionTermMother.random().toPrimitives()],
      ),
      userId,
    );
  }
}
