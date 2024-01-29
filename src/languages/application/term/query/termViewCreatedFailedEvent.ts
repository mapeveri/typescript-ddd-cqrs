import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';

export default class TermViewCreatedFailedEvent extends DomainEvent {
  constructor(public readonly id: string, public readonly type: string, eventId = '') {
    super(id, eventId);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(payload['id'], payload['type'], payload['eventId']);
  }

  public static eventTypeName(): string {
    return 'term.created.failed';
  }

  public classPathName(): string {
    return 'languages.domain.term.domainEvents.termCreatedFailedEvent';
  }

  public static aggregateTypeName(): string {
    return 'term';
  }
}
