import { WordTermDTO } from '@src/languages/domain/word/valueObjects/wordTerm';
import { Command } from '@src/shared/domain/buses/commandBus/command';

export default class CreateWordCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<WordTermDTO>
  ) {}
}
