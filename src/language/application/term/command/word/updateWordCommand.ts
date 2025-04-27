import { Command } from '@src/shared/domain/bus/commandBus/command';
import { WordTermPrimitives } from '@src/language/domain/term/word/wordTerm';

export default class UpdateWordCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly terms: Array<WordTermPrimitives>,
  ) {}
}
