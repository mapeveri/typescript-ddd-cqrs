import Term from '../../../../domain/term/term';
import TermRepository from '../../../../domain/term/termRepository';
import MongoConnection from '../../../../../shared/infrastructure/persistence/mongo/mongoConnection';

export default class MongoTermRepository implements TermRepository {
  async search(text: string): Promise<Term[] | null> {
    const result: Term[] = [];
    console.log(text);
    return result;
  }

  async save(term: Term): Promise<void> {
    const mongo = await MongoConnection.getInstance();
    const collection = mongo.db.collection('terms');
    await collection.updateOne({ id: term.id }, { $set: term }, { upsert: true });
  }
}
