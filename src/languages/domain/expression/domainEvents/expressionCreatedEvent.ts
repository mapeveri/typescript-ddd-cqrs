import { DomainEvent } from '@src/shared/domain/buses/eventBus/domainEvent';
import { ExpressionTermDTO } from '../valueObjects/expressionTerm';


export default class ExpressionCreatedEvent extends DomainEvent {
  constructor(
    public readonly id: string,
    public readonly languageId: string,
    public readonly countryId: string,
    public readonly userId: string,
    public readonly terms: Array<ExpressionTermDTO>
  ) {
    super(id);
  }

  public static fromPrimitives(payload: { [key: string]: any }): DomainEvent {
    return new this(payload['id'], payload['languageId'], payload['countryId'], payload['userId'], payload['terms']);
  }

  public static eventTypeName(): string {
    return 'expression.created';
  }

  public static aggregateTypeName(): string {
    return 'expression';
  }
}
