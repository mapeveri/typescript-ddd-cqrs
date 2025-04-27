import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';

export default class TermLikeAddedEvent extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly photo: string,
    eventId = '',
  ) {
    super(id, eventId);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(payload['id'], payload['userId'], payload['name'], payload['photo'], payload['eventId']);
  }

  public static eventTypeName(): string {
    return 'term.like.added';
  }

  public classPathName(): string {
    return 'language.domain.term.termLikeAddedEvent';
  }

  public static aggregateTypeName(): string {
    return 'term';
  }
}
