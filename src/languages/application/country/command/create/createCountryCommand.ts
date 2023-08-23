import { LanguagePrimitives } from '@src/languages/domain/country/valueObjects/language';

export default class CreateCountryCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly iso: string,
    public readonly languages: Array<LanguagePrimitives>
  ) {}
}
