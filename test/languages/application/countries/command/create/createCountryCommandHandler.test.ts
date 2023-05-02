import { beforeEach, describe, it } from '@jest/globals';
import CreateCountryCommandHandler from '@src/languages/application/country/command/create/createCountryCommandHandler';
import Country from '@src/languages/domain/country/country';
import { CountryRepositoryMock } from '@test/languages/domain/countries/countryRepositoryMock';
import CountryMother from '@test/languages/domain/countries/countryMother';
import CreateCountryCommandMother from './createCountryCommandMother';

describe('CreateCountryCommandHandler handle', () => {
  let countryRepository: CountryRepositoryMock;
  let createCountryCommandHandler: CreateCountryCommandHandler;

  beforeEach(() => {
    countryRepository = new CountryRepositoryMock();
    createCountryCommandHandler = new CreateCountryCommandHandler(countryRepository);
  });

  it('should create and save a country', async () => {
    const command = CreateCountryCommandMother.create({
      id: 'de56e9bd-596e-4aba-9dda-cd7ac8fb3fa0',
      name: 'Test Country',
      iso: 'TC',
      languages: [
        { name: 'English', language_id: 'en' },
        { name: 'Spanish', language_id: 'es' },
      ],
    });
    const country: Country = CountryMother.createFromCreateCountryCommand(command);

    await createCountryCommandHandler.handle(command);

    countryRepository.assertSaveHasBeenCalledWith(country);
  });
});
