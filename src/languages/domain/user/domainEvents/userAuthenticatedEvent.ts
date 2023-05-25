import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';

export default class UserAuthenticatedEvent extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly token: string,
    public readonly provider: string,
    public readonly photo: string
  ) {
    super(id);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(
      payload['id'],
      payload['name'],
      payload['email'],
      payload['token'],
      payload['provider'],
      payload['photo']
    );
  }

  public static eventTypeName(): string {
    return 'user.authenticated';
  }

  public static aggregateTypeName(): string {
    return 'user';
  }
}
