import UserId from '@src/languages/domain/user/valueObjects/userId';
import { CountryIdMother } from '../country/valueObjects/countryIdMother';
import CreateExpressionCommand from '@src/languages/application/expression/command/create/createExpressionCommand';
import Expression from '@src/languages/domain/expression/expression';
import ExpressionTerm from '@src/languages/domain/expression/valueObjects/expressionTerm';
import ExpressionTermMother, { ExpressionTermMotherProps } from './valueObjects/expressionTermMother';
import { ExpressionIdMother } from './valueObjects/expressionIdMother';
import ExpressionTermCollectionMother from './valueObjects/expressionTermCollectionMother';

export default class ExpressionMother {
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
      ExpressionTermCollectionMother.random(terms ?? [ExpressionTermMother.random()]),
      userId
    );
  }
}
