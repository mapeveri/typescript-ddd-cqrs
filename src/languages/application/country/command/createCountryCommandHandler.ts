import CountryRepository, { COUNTRY_REPOSITORY } from '@src/languages/domain/country/countryRepository';
import CreateCountryCommand from './createCountryCommand';
import Country from '@src/languages/domain/country/country';
import CountryId from '@src/languages/domain/country/countryId';
import LanguageCollection from '@src/languages/domain/country/languageCollection';
import CountryAlreadyExistsException from '@src/languages/domain/country/countryAlreadyExistsException';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { CommandHandler, ICommandHandler } from '@src/shared/domain/bus/commandBus/commandHandler';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';

@CommandHandler(CreateCountryCommand)
export default class CreateCountryCommandHandler implements ICommandHandler<CreateCountryCommand> {
  constructor(
    @Inject(COUNTRY_REPOSITORY) private readonly countryRepository: CountryRepository,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateCountryCommand): Promise<void> {
    const countryId = CountryId.of(command.id);
    await this.guardCountryDoesNotExists(countryId);

    const languages = LanguageCollection.of(command.languages);

    const country = Country.create(countryId, command.name, command.iso, languages);

    this.countryRepository.save(country);

    void this.eventBus.publish(country.pullDomainEvents());
  }

  private async guardCountryDoesNotExists(countryId: CountryId): Promise<void> {
    const country = await this.countryRepository.findById(countryId);
    if (country) {
      throw new CountryAlreadyExistsException(countryId.toString());
    }
  }
}
