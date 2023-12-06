import CreateExpressionCommand from '@src/languages/application/expression/command/create/createExpressionCommand';
import { ExpressionTermPrimitives } from '@src/languages/domain/expression/valueObjects/expressionTerm';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import ExpressionPostDto from './expressionPostDto';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';

@ApiTags('Expressions')
@Controller()
export default class ExpressionPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('expressions')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async run(@Body() payload: ExpressionPostDto): Promise<any> {
    const expressionTerms: Array<ExpressionTermPrimitives> = payload.terms;
    await this.commandBus.dispatch(
      new CreateExpressionCommand(payload.id, payload.languageId, payload.countryId, payload.userId, expressionTerms),
    );
  }
}
