import CountryCreatedEvent from '@src/languages/domain/country/countryCreatedEvent';
import CreateCountryCommand from '@src/languages/application/country/command/create/createCountryCommand';
import { expect } from '@jest/globals';

export class CountryCreatedEventMother {
  static createFromCreateCountryCommand(command: CreateCountryCommand): CountryCreatedEvent {
    const eventId = expect.any(String) as unknown as string;
    return new CountryCreatedEvent(command.id, command.name, command.iso, command.languages, eventId);
  }
}
