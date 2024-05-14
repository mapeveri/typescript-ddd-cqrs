import { IProjectionHandler, ProjectionHandler } from '@src/shared/domain/bus/projectionBus/projectionHandler';
import AddLikeToTermProjection from '@src/languages/application/term/projection/addLikeToTermProjection';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import { TermLike, TermView } from '@src/languages/application/term/viewModel/termView';
import { Collection } from 'mongodb';
import { Document } from 'bson/src/bson';
import { WithId } from 'typeorm';

@ProjectionHandler(AddLikeToTermProjection)
export default class AddLikeToTermProjectionHandler implements IProjectionHandler<AddLikeToTermProjection> {
  constructor(@Inject(MONGO_CLIENT) private readonly mongo: MongoConnection) {}

  async execute(projection: AddLikeToTermProjection): Promise<void> {
    const termView = await this.getTerm(projection.id);

    if (termView.likes.some((like: TermLike) => like.userId === projection.userId)) return;

    termView.totalLikes = termView.totalLikes + 1;
    termView.likes.push({ name: projection.name, photo: projection.photo, userId: projection.userId });

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
