import CountryRepository, { COUNTRY_REPOSITORY } from '@src/language/domain/country/countryRepository';
import CreateCountryCommand from './createCountryCommand';
import Country from '@src/language/domain/country/country';
import CountryId from '@src/language/domain/country/countryId';
import CountryAlreadyExistsException from '@src/language/domain/country/countryAlreadyExistsException';
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
    await this.guardCountryDoesNotExists(command.id);

    const country = Country.create(command.id, command.name, command.iso, command.languages);

    this.countryRepository.save(country);

    void this.eventBus.publish(country.pullDomainEvents());
  }

  private async guardCountryDoesNotExists(countryId: string): Promise<void> {
    const country = await this.countryRepository.findById(CountryId.of(countryId));
    if (country) {
      throw new CountryAlreadyExistsException(countryId);
    }
  }
}
