import { DomainEvent } from '@src/shared/domain/bus/eventBus/domainEvent';
import { ExpressionTermPrimitives } from './expressionTerm';

export default class ExpressionCreatedEvent extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<ExpressionTermPrimitives>,
    eventId = '',
  ) {
    super(id, eventId);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(
      payload['id'],
      payload['languageId'],
      payload['countryId'],
      payload['userId'],
      payload['terms'],
      payload['eventId'],
    );
  }

  public classPathName(): string {
    return 'languages.domain.expression.domainEvents.expressionCreatedEvent';
  }

  public static eventTypeName(): string {
    return 'expression.created';
  }

  public static aggregateTypeName(): string {
    return 'expression';
  }
}
