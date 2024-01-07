import CountryRepository, { COUNTRY_REPOSITORY } from '@src/languages/domain/country/countryRepository';
import CreateCountryCommand from './createCountryCommand';
import Country from '@src/languages/domain/country/country';
import CountryId from '@src/languages/domain/country/valueObjects/countryId';
import LanguageCollection from '@src/languages/domain/country/valueObjects/languageCollection';
import CountryAlreadyExistsException from '@src/languages/domain/country/exceptions/countryAlreadyExistsException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';

@CommandHandler(CreateCountryCommand)
export default class CreateCountryCommandHandler implements ICommandHandler<CreateCountryCommand> {
  constructor(@Inject(COUNTRY_REPOSITORY) private readonly countryRepository: CountryRepository) {}

  async execute(command: CreateCountryCommand): Promise<void> {
    const countryId = CountryId.of(command.id);
    await this.guardCountryDoesNotExists(countryId);

    const languages = LanguageCollection.of(command.languages);

    const country = Country.create(countryId, command.name, command.iso, languages);

    await this.countryRepository.save(country);
  }

  private async guardCountryDoesNotExists(countryId: CountryId): Promise<void> {
    const country = await this.countryRepository.findById(countryId);
    if (country) {
      throw new CountryAlreadyExistsException(countryId.toString());
    }
  }
}
