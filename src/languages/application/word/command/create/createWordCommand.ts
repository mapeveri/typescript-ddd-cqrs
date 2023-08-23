import { WordTermPrimitives } from '@src/languages/domain/word/valueObjects/wordTerm';

export default class CreateWordCommand {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<WordTermPrimitives>
  ) {}
}
