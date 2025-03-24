import CreateWordCommand from '@src/languages/application/term/command/word/createWordCommand';
import { WordTermPrimitives } from '@src/languages/domain/term/word/wordTerm';
import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Req, UseGuards } from '@nestjs/common';
import WordPostDto from './wordPostDto';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/auth/jwt/nestJwtAuthGuard';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import { Request } from 'express';

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
  @UseGuards(NestJwtAuthGuard)
  async run(@Req() req: Request, @Body() payload: WordPostDto): Promise<void> {
    const userId = req.user['id'];
    const wordTerms: Array<WordTermPrimitives> = payload.terms;
    await this.commandBus.dispatch(
      new CreateWordCommand(payload.id, payload.languageId, payload.countryId, userId, wordTerms),
    );
  }
}
