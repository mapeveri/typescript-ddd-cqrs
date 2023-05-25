import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { WordTermDTO } from '../valueObjects/wordTerm';

export default class WordCreatedEvent extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<WordTermDTO>
  ) {
    super(id);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(payload['id'], payload['languageId'], payload['countryId'], payload['userId'], payload['terms']);
  }

  public static eventTypeName(): string {
    return 'word.created';
  }

  public static aggregateTypeName(): string {
    return 'word';
  }
}
