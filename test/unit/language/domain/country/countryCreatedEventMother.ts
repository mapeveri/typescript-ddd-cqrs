import CountryCreatedEvent from '@src/language/domain/country/countryCreatedEvent';
import CreateCountryCommand from '@src/language/application/country/command/createCountryCommand';
import { expect } from 'vitest';

export class CountryCreatedEventMother {
  static createFromCreateCountryCommand(command: CreateCountryCommand): CountryCreatedEvent {
    const eventId = expect.any(String) as unknown as string;
    return new CountryCreatedEvent(command.id, command.name, command.iso, command.languages, eventId);
  }
}
