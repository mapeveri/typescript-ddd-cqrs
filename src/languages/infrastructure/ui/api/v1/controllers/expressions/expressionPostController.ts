import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import CreateExpressionCommand from '@src/languages/application/expression/command/create/createExpressionCommand';
import { ExpressionTermPrimitives } from '@src/languages/domain/expression/valueObjects/expressionTerm';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import ExpressionPostDto from './expressionPostDto';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';

@Controller()
export default class ExpressionPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('expressions')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async run(@Body() payload: ExpressionPostDto): Promise<any> {
    const expressionTerms: Array<ExpressionTermPrimitives> = payload.terms;
    await this.commandBus.dispatch(
      new CreateExpressionCommand(payload.id, payload.languageId, payload.countryId, payload.userId, expressionTerms)
    );

    return;
  }
}
