import { Inject } from '@src/shared/domain/injector/inject.decorator';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import { TermLike, TermView } from '@src/languages/application/term/query/termView';
import { Collection } from 'mongodb';
import { Document } from 'bson/src/bson';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import TermLikeAddedEvent from '@src/languages/domain/term/termLikeAddedEvent';
import { MongoTransactional } from '@src/shared/infrastructure/persistence/mongo/mongoTransactionalDecorator';

@MongoTransactional
@EventsHandler(TermLikeAddedEvent)
export default class AddLikeToTermViewProjectionHandler implements IEventHandler<TermLikeAddedEvent> {
  private collection: Collection<Document>;

  constructor(@Inject(MONGO_CLIENT) private readonly mongo: MongoConnection) {
    this.collection = this.mongo.db.collection('terms');
  }

  async handle(event: TermLikeAddedEvent): Promise<void> {
    const termView = await this.collection.findOne({ id: event.id });
    if (!termView) throw new Error('Term view not found');

    if (termView.likes.some((like: TermLike) => like.userId === event.userId)) return;

    termView.totalLikes = termView.totalLikes + 1;
    termView.likes.push({ name: event.name, photo: event.photo, userId: event.userId });

    await this.save(termView as unknown as TermView);
  }

  private async save(termView: TermView): Promise<void> {
    const session = this.mongo.session;
    if (!session) {
      throw new Error('The session is not available');
    }

    await this.collection.updateOne({ id: termView.id }, { $set: termView }, { session });
  }
}
