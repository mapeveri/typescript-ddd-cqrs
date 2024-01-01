import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';

export default class UserUpdatedEvent extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly photo: string,
    public readonly interests: string[],
    eventId = '',
  ) {
    super(id, eventId);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(payload['id'], payload['name'], payload['photo'], payload['interests'], payload['eventId']);
  }

  public static eventTypeName(): string {
    return 'user.updated';
  }

  public classPathName(): string {
    return 'languages.domain.user.domainEvents.userUpdatedEvent';
  }

  public static aggregateTypeName(): string {
    return 'user';
  }
}
