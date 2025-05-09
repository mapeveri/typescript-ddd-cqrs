import { Body, Controller, HttpCode, HttpStatus, Inject, Param, Put, Req, UseGuards } from '@nestjs/common';
import { NestJwtAuthGuard } from '@src/shared/infrastructure/auth/jwt/nestJwtAuthGuard';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/bus/commandBus/commandBus';
import UpdateWordCommand from '@src/language/application/term/command/word/updateWordCommand';
import WordPutDto from '@src/language/app/controllers/v1/terms/words/wordPutDto';
import { Request } from 'express';

@ApiTags('Words')
@Controller()
export default class WordPutController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Put('words/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @UseGuards(NestJwtAuthGuard)
  async run(@Param('id') id: string, @Req() req: Request, @Body() payload: WordPutDto): Promise<void> {
    const userId = req.user['id'];
    await this.commandBus.dispatch(
      new UpdateWordCommand(id, userId, payload.languageId, payload.countryId, payload.terms),
    );
  }
}
