import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import { WordTermPrimitives } from '@src/languages/domain/word/valueObjects/wordTerm';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import WordPostDto from './wordPostDto';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';

@ApiTags('Words')
@Controller()
export default class WordPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('words')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(JwtAuthGuard)
  async run(@Body() payload: WordPostDto): Promise<any> {
    const wordTerms: Array<WordTermPrimitives> = payload.terms;
    await this.commandBus.dispatch(
      new CreateWordCommand(payload.id, payload.languageId, payload.countryId, payload.userId, wordTerms),
    );
  }
}
