import { LanguagePrimitives } from '@src/languages/domain/country/language';
import { Command } from '@src/shared/domain/bus/commandBus/command';

export default class CreateCountryCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly iso: string,
    public readonly languages: Array<LanguagePrimitives>,
  ) {}
}
