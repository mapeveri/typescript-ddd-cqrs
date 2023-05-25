import CountryRepository from '@src/languages/domain/country/countryRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import CreateCountryCommand from './createCountryCommand';
import Country, { Language } from '@src/languages/domain/country/country';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';

export default class CreateCountryCommandHandler implements CommandHandler {
  constructor(private countryRepository: CountryRepository) {}

  async handle(command: CreateCountryCommand): Promise<void> {
    const languages: Array<Language> = this.getLanguages(command.languages);

    const country = Country.create(new CountryId(command.id), command.name, command.iso, languages);

    await this.countryRepository.save(country);
  }

  private getLanguages(languages: Array<{ [key: string]: string }>): Array<Language> {
    return languages.map((language: { [key: string]: string }): Language => {
      return { name: language['name'], languageId: language['language_id'] };
    });
  }
}
