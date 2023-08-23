import { ExpressionTermPrimitives } from '@src/languages/domain/expression/valueObjects/expressionTerm';

export default class CreateExpressionCommand {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<ExpressionTermPrimitives>
  ) {}
}
