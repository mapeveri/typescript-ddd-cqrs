import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';

export default class TermDislikedEvent extends DomainEvent {
  constructor(public readonly id: string, public readonly userId: string, eventId = '') {
    super(id, eventId);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(payload['id'], payload['userId'], payload['name']);
  }

  public static eventTypeName(): string {
    return 'term.disliked';
  }

  public classPathName(): string {
    return 'language.domain.term.termDislikedEvent';
  }

  public static aggregateTypeName(): string {
    return 'term';
  }
}
