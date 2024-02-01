import { WordTermPrimitives } from '@src/languages/domain/term/word/wordTerm';
import { Command } from '@src/shared/domain/bus/commandBus/command';

export default class CreateWordCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<WordTermPrimitives>,
  ) {}
}
