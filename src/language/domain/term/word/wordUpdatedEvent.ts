import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';
import { WordTermPrimitives } from './wordTerm';

export default class WordUpdatedEvent extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<WordTermPrimitives>,
    eventId = '',
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
      payload['eventId'],
    );
  }

  public classPathName(): string {
    return 'language.domain.term.word.wordUpdatedEvent';
  }

  public static eventTypeName(): string {
    return 'word.updated';
  }

  public static aggregateTypeName(): string {
    return 'word';
  }
}
