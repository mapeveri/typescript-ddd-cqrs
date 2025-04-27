import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';

export default class UserSignedUpEvent extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly provider: string,
    public readonly email: string,
    public readonly photo: string,
    eventId = '',
  ) {
    super(id, eventId);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(
      payload['id'],
      payload['name'],
      payload['provider'],
      payload['email'],
      payload['photo'],
      payload['eventId'],
    );
  }

  public static eventTypeName(): string {
    return 'user.signedUp';
  }

  public classPathName(): string {
    return 'language.domain.user.userSignedUpEvent';
  }

  public static aggregateTypeName(): string {
    return 'user';
  }
}
