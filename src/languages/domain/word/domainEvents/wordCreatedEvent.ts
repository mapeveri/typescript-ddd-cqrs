import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { WordTermDTO } from '../valueObjects/wordTerm';

export default class WordCreatedEvent extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<WordTermDTO>,
    public readonly eventId: string = ''
  ) {
    super(id, eventId);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(
      payload['id'],
      payload['languageId'],
      payload['countryId'],
      payload['userId'],
      payload['terms'],
      payload['eventId']
    );
  }

  public static eventTypeName(): string {
    return 'word.created';
  }

  public static aggregateTypeName(): string {
    return 'word';
  }
}
