import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';

export default class TermDeletedEvent extends DomainEvent {
  constructor(public readonly id: string, public readonly termType: string, eventId = '') {
    super(id, eventId);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(payload['id'], payload['termType'], payload['name']);
  }

  public static eventTypeName(): string {
    return 'term.deleted';
  }

  public classPathName(): string {
    return 'languages.domain.term.termDeletedEvent';
  }

  public static aggregateTypeName(): string {
    return 'term';
  }
}
