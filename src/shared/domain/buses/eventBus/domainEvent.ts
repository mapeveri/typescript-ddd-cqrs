import { v4 as uuidv4 } from 'uuid';

export abstract class DomainEvent {
  public readonly aggregateId: string;
  public readonly eventId: string;
  public readonly occurredOn: string;

  constructor(aggregateId: string, eventId: string | null = null, occurredOn: string | null = null) {
    this.aggregateId = aggregateId;
    this.eventId = eventId ?? uuidv4();
    this.occurredOn = occurredOn ?? new Date().toISOString().replace('T', ' ').split('.')[0];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static fromPrimitives(payload: object): DomainEvent {
    throw new Error('Method not implemented.');
  }

  public static eventTypeName(): string {
    throw new Error('Method not implemented.');
  }

  public static aggregateTypeName(): string {
    throw new Error('Method not implemented.');
  }

  public domainEventName(): string {
    return this.constructor.name;
  }
}
