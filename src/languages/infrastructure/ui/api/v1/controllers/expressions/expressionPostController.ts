import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import CreateExpressionCommand from '@src/languages/application/expression/command/create/createExpressionCommand';
import { ExpressionTermPrimitives } from '@src/languages/domain/expression/valueObjects/expressionTerm';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import ExpressionPostDto from './expressionPostDto';

@Controller()
export default class ExpressionPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('expressions')
  @HttpCode(HttpStatus.CREATED)
  async run(@Body() payload: ExpressionPostDto): Promise<any> {
    const expressionTerms: Array<ExpressionTermPrimitives> = this.transformExpressionTerms(payload.terms);
    await this.commandBus.dispatch(
      new CreateExpressionCommand(payload.id, payload.language_id, payload.country_id, payload.user_id, expressionTerms)
    );

    return;
  }

  private transformExpressionTerms(expressionTerms: Array<Record<string, any>>): Array<ExpressionTermPrimitives> {
    return expressionTerms.map((expressionTerm: Record<string, any>) => {
      return {
        expression: expressionTerm.expression,
        description: expressionTerm.description,
        example: expressionTerm.example,
        hashtags: expressionTerm.hashtags,
      };
    });
  }
}
