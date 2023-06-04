import { LanguageDTO } from '@src/languages/domain/country/valueObjects/language';
import { Command } from '@src/shared/domain/buses/commandBus/command';

export default class CreateCountryCommand implements Command {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly iso: string,
    public readonly languages: Array<LanguageDTO>
  ) {}
}
