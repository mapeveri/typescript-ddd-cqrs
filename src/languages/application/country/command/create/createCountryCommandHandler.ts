import CountryRepository from '@src/languages/domain/country/countryRepository';
import { CommandHandler } from '@src/shared/domain/buses/commandBus/commandHandler';
import CreateCountryCommand from './createCountryCommand';
import Country from '@src/languages/domain/country/country';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import LanguageCollection from '@src/languages/domain/country/valueObjects/languageCollection';

export default class CreateCountryCommandHandler implements CommandHandler {
  constructor(private countryRepository: CountryRepository) {}

  async handle(command: CreateCountryCommand): Promise<void> {
    const languages = LanguageCollection.of(command.languages);

    const country = Country.create(CountryId.of(command.id), command.name, command.iso, languages);

    await this.countryRepository.save(country);
  }
}
