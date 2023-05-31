import { beforeEach, describe, it } from '@jest/globals';
import CreateCountryCommandHandler from '@src/languages/application/country/command/create/createCountryCommandHandler';
import Country from '@src/languages/domain/country/country';
import { CountryRepositoryMock } from '@test/languages/domain/country/countryRepositoryMock';
import CountryMother from '@test/languages/domain/country/countryMother';
import { CreateCountryCommandMother } from './createCountryCommandMother';

describe('CreateCountryCommandHandler handle', () => {
  let countryRepository: CountryRepositoryMock;
  let createCountryCommandHandler: CreateCountryCommandHandler;

  beforeEach(() => {
    countryRepository = new CountryRepositoryMock();
    createCountryCommandHandler = new CreateCountryCommandHandler(countryRepository);
  });

  it('should create and save a country', async () => {
    const command = CreateCountryCommandMother.random();
    const country: Country = CountryMother.createFromCreateCountryCommand(command);

    await createCountryCommandHandler.handle(command);

    countryRepository.expectSaveCalledWith(country);
  });
});
