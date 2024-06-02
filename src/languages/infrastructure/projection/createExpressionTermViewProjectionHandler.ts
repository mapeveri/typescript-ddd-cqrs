import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { EVENT_BUS, EventBus } from '@src/shared/domain/bus/eventBus/eventBus';
import TermCreatedUncompletedEvent from '@src/languages/domain/term/termCreatedUncompletedEvent';
import ExpressionCreatedEvent from '@src/languages/domain/term/expression/expressionCreatedEvent';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import { TermTypeEnum } from '@src/languages/domain/term/termType';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import { TermView } from '@src/languages/application/term/view/termView';
import { MongoTransactional } from '@src/shared/infrastructure/persistence/mongo/mongoTransactionalDecorator';

@MongoTransactional
@EventsHandler(ExpressionCreatedEvent)
export default class CreateExpressionTermViewProjectionHandler implements IEventHandler<ExpressionCreatedEvent> {
  constructor(
    @Inject(MONGO_CLIENT) private readonly mongo: MongoConnection,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async handle(event: ExpressionCreatedEvent): Promise<void> {
    const termType = TermTypeEnum.EXPRESSION;
    for (const term of event.terms) {
      try {
        await this.save({
          id: event.aggregateId,
          title: term['expression'],
          description: term['description'],
          example: term['example'],
          type: termType,
          hashtags: term['hashtags'],
          totalLikes: 0,
          likes: [],
          createdAt: new Date(event.occurredOn).toISOString(),
        });
      } catch (e) {
        void this.eventBus.publish([new TermCreatedUncompletedEvent(event.aggregateId, termType)]);
        throw e;
      }
    }
  }

  private async save(termView: TermView): Promise<void> {
    const session = this.mongo.session;
    if (!session) {
      throw new Error('The session is not available');
    }

    await this.mongo.db
      .collection('terms')
      .updateOne({ id: termView.id }, { $set: termView }, { upsert: true, session: session });
  }
}
