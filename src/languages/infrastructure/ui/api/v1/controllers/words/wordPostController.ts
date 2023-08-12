import CreateWordCommand from '@src/languages/application/word/command/create/createWordCommand';
import { COMMAND_BUS, CommandBus } from '@src/shared/domain/buses/commandBus/commandBus';
import { WordTermPrimitives } from '@src/languages/domain/word/valueObjects/wordTerm';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import WordPostDto from './wordPostDto';
import { JwtAuthGuard } from '@src/shared/infrastructure/nestjs/guards/JwtAuthGuard';

@Controller()
export default class WordPostController {
  public constructor(@Inject(COMMAND_BUS) private commandBus: CommandBus) {}

  @Post('words')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async run(@Body() payload: WordPostDto): Promise<any> {
    const wordTerms: Array<WordTermPrimitives> = this.transformWordTerms(payload.terms);
    await this.commandBus.dispatch(
      new CreateWordCommand(payload.id, payload.language_id, payload.country_id, payload.user_id, wordTerms)
    );

    return;
  }

  private transformWordTerms(wordTerms: Array<Record<string, any>>): Array<WordTermPrimitives> {
    return wordTerms.map((wordTerm: Record<string, any>) => {
      return {
        word: wordTerm.word,
        description: wordTerm.description,
        example: wordTerm.example,
        hashtags: wordTerm.hashtags,
      };
    });
  }
}
