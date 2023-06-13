import Term from '@src/languages/domain/term/term';
import TermRepository from '@src/languages/domain/term/termRepository';
import MongoConnection from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import { Collection, Document } from 'mongodb';

export default class MongoTermRepository implements TermRepository {
  private collection: Collection<any>;

  constructor() {
    MongoConnection.getInstance().then((mongo: MongoConnection) => {
      this.collection = mongo.db.collection('terms');
    });
  }
  async search(term: string): Promise<Term[] | null> {
    const regexTerm = new RegExp(term, 'i');
    const searchQuery = {
      $or: [{ title: regexTerm }, { description: regexTerm }, { example: regexTerm }],
    };

    const result = await this.collection.find(searchQuery).project({ _id: 0 }).toArray();

    const terms: Term[] = result.map((doc: Document) => {
      return Term.create(
        doc.id,
        doc.title,
        doc.description,
        doc.example,
        doc.type,
        doc.hashtags,
        doc.likes,
        doc.disLikes,
        doc.favourites,
      );
    });

    return terms;
  }

  async save(term: Term): Promise<void> {
    await this.collection.updateOne({ id: term.id }, { $set: term }, { upsert: true });
  }
}
