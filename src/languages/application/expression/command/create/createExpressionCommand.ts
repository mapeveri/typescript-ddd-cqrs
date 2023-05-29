import { ExpressionTermDTO } from '@src/languages/domain/expression/valueObjects/expressionTerm';
import { Command } from '@src/shared/domain/buses/commandBus/command';

export default class CreateExpressionCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<ExpressionTermDTO>
  ) {}
}
