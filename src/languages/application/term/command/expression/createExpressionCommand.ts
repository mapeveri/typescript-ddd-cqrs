import { ExpressionTermPrimitives } from '@src/languages/domain/term/expression/expressionTerm';
import { Command } from '@src/shared/domain/bus/commandBus/command';

export default class CreateExpressionCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<ExpressionTermPrimitives>,
  ) {}
}
