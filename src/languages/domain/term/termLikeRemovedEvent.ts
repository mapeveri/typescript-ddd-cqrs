import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';

export default class TermLikeRemovedEvent extends DomainEvent {
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
    return 'term.like.removed';
  }

  public classPathName(): string {
    return 'languages.domain.term.termLikeRemovedEvent';
  }

  public static aggregateTypeName(): string {
    return 'term';
  }
}
