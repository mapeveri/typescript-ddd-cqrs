import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';
import { LanguagePrimitives } from '@src/languages/domain/country/language';

export default class CountryCreatedEvent extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly iso: string,
    public readonly languages: Array<LanguagePrimitives>,
    eventId = '',
  ) {
    super(id, eventId);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(payload['id'], payload['name'], payload['iso'], payload['languages']);
  }

  public classPathName(): string {
    return 'languages.domain.country.countryCreatedEvent';
  }

  public static eventTypeName(): string {
    return 'country.created';
  }

  public static aggregateTypeName(): string {
    return 'country';
  }
}
