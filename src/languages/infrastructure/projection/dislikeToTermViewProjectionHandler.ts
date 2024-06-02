import { Inject } from '@src/shared/domain/injector/inject.decorator';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import { TermLike, TermView } from '@src/languages/application/term/view/termView';
import { Collection } from 'mongodb';
import { Document } from 'bson/src/bson';
import { WithId } from 'typeorm';
import TermDislikedEvent from '@src/languages/domain/term/termDislikedEvent';
import { EventsHandler, IEventHandler } from '@src/shared/domain/bus/eventBus/eventsHandler';
import { MongoTransactional } from '@src/shared/infrastructure/persistence/mongo/mongoTransactionalDecorator';

@MongoTransactional
@EventsHandler(TermDislikedEvent)
export default class DislikeToTermViewProjectionHandler implements IEventHandler<TermDislikedEvent> {
  constructor(@Inject(MONGO_CLIENT) private readonly mongo: MongoConnection) {}

  async handle(event: TermDislikedEvent): Promise<void> {
    const termView = await this.getTerm(event.id);

    if (!termView.likes.some((like: TermLike) => like.userId === event.userId)) return;

    termView.totalLikes = termView.totalLikes - 1;
    termView.likes = termView.likes.filter((like: { userId: string }) => like.userId != event.userId);

    await this.save(termView as unknown as TermView);
  }

  private async getTerm(id: string): Promise<WithId<Document>> {
    const term = this.collection().findOne({ id });
    if (!term) throw new Error('Term view not found');

    return term as unknown as WithId<Document>;
  }

  private async save(termView: TermView): Promise<void> {
    const session = this.mongo.session;
    if (!session) {
      throw new Error('The session is not available');
    }

    await this.collection().updateOne({ id: termView.id }, { $set: termView }, { session });
  }

  private collection(): Collection<Document> {
    return this.mongo.db.collection('terms');
  }
}
