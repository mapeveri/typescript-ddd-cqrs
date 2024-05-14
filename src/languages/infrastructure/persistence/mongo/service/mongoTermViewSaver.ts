import { Injectable } from '@nestjs/common';
import TermViewSaver from '@src/languages/application/term/projection/termViewSaver';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import { TermView } from '@src/languages/application/term/view/termView';

@Injectable()
export default class MongoTermViewSaver implements TermViewSaver {
  constructor(@Inject(MONGO_CLIENT) private readonly mongo: MongoConnection) {}

  async save(termView: TermView): Promise<void> {
    const session = this.mongo.session;
    if (!session) {
      throw new Error('The session is not available');
    }

    await this.mongo.db
      .collection('terms')
      .updateOne({ id: termView.id }, { $set: termView }, { upsert: true, session: session });
  }
}
