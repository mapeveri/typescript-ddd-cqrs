import { beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import CreateCountryCommandHandler from '@src/languages/application/country/command/createCountryCommandHandler';
import Country from '@src/languages/domain/country/country';
import { CountryRepositoryMock } from '@test/unit/languages/domain/country/countryRepositoryMock';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import CountryMother from '@test/unit/languages/domain/country/countryMother';
import { CreateCountryCommandMother } from '@test/unit/languages/application/country/command/createCountryCommandMother';
import CountryAlreadyExistsException from '@src/languages/domain/country/countryAlreadyExistsException';
import { CountryCreatedEventMother } from '@test/unit/languages/domain/country/countryCreatedEventMother';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import CreateCountryCommand from '@src/languages/application/country/command/createCountryCommand';

describe('Given a CreateCountryCommandHandler to handle', () => {
  let eventBus: EventBusMock;
  let countryRepository: CountryRepositoryMock;
  let handler: CreateCountryCommandHandler;

  const prepareDependencies = () => {
    eventBus = new EventBusMock();
    countryRepository = new CountryRepositoryMock();
  };

  const initHandler = () => {
    handler = new CreateCountryCommandHandler(countryRepository, eventBus);
  };

  const clean = () => {
    countryRepository.clean();
    eventBus.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When the country id is invalid', () => {
    let command: CreateCountryCommand;

    function startScenario() {
      command = CreateCountryCommandMother.random({ id: '' });
    }

    beforeEach(startScenario);

    it('should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('should not create the country', async () => {
      await expect(handler.execute(command)).rejects.toThrow();

      expect(countryRepository.storedChanged()).toBeFalsy();
      expect(countryRepository.stored()).toHaveLength(0);
    });

    it('should not publish any event', async () => {
      await expect(handler.execute(command)).rejects.toThrow();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the country already exists', () => {
    let command: CreateCountryCommand;

    function startScenario() {
      const country = CountryMother.random();
      command = CreateCountryCommandMother.random({ id: country.id.value });
      countryRepository.add(country);
    }

    beforeEach(startScenario);

    it('should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(CountryAlreadyExistsException);
    });

    it('should not create the country', async () => {
      await expect(handler.execute(command)).rejects.toThrow();

      expect(countryRepository.storedChanged()).toBeFalsy();
      expect(countryRepository.stored()).toHaveLength(0);
    });

    it('should not publish any event', async () => {
      await expect(handler.execute(command)).rejects.toThrow();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the parameters are valid and the country does not exists', () => {
    let command: CreateCountryCommand;
    let country: Country;

    function startScenario() {
      command = CreateCountryCommandMother.random();
      country = CountryMother.createFromCreateCountryCommand(command);
    }

    beforeEach(startScenario);

    it('should create a country', async () => {
      await handler.execute(command);

      const countryStored = countryRepository.stored();
      expect(countryRepository.storedChanged()).toBeTruthy();
      expect(countryStored).toHaveLength(1);
      expect(countryStored[0].toPrimitives()).toEqual(country.toPrimitives());
    });

    it('should publish an event', async () => {
      await handler.execute(command);

      const countryCreatedEvent = CountryCreatedEventMother.createFromCreateCountryCommand(command);
      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...countryCreatedEvent,
      });
    });
  });
});
