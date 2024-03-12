import { beforeEach, describe, expect, it } from '@jest/globals';
import CreateCountryCommandHandler from '@src/languages/application/country/command/create/createCountryCommandHandler';
import Country from '@src/languages/domain/country/country';
import { CountryRepositoryMock } from '@test/unit/languages/domain/country/countryRepositoryMock';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import CountryMother from '@test/unit/languages/domain/country/countryMother';
import { CreateCountryCommandMother } from '@test/unit/languages/application/country/command/create/createCountryCommandMother';
import CountryAlreadyExistsException from '@src/languages/domain/country/countryAlreadyExistsException';
import { CountryCreatedEventMother } from '@test/unit/languages/domain/country/countryCreatedEventMother';

describe('CreateCountryCommandHandler', () => {
  let eventBus: EventBusMock;
  let countryRepository: CountryRepositoryMock;
  let createCountryCommandHandler: CreateCountryCommandHandler;

  beforeEach(() => {
    eventBus = new EventBusMock();
    countryRepository = new CountryRepositoryMock();

    createCountryCommandHandler = new CreateCountryCommandHandler(countryRepository, eventBus);
  });

  describe('execute', () => {
    it('should raise an exception when country id already exists', async () => {
      const country = CountryMother.random();
      const command = CreateCountryCommandMother.random({ id: country.id.value });
      countryRepository.add(country);

      await expect(createCountryCommandHandler.execute(command)).rejects.toThrowError(CountryAlreadyExistsException);

      countryRepository.shouldNotStore();
    });

    it('should create a country', async () => {
      const command = CreateCountryCommandMother.random();
      const country: Country = CountryMother.createFromCreateCountryCommand(command);
      const countryCreatedEvent = CountryCreatedEventMother.createFromCreateCountryCommand(command);

      await createCountryCommandHandler.execute(command);

      countryRepository.shouldStore(country);
      eventBus.shouldPublish([countryCreatedEvent]);
    });
  });
});
