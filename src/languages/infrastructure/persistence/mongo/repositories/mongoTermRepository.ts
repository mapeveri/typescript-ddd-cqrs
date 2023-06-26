import Term from '@src/languages/domain/term/term';
import TermRepository from '@src/languages/domain/term/termRepository';
import MongoRepository from '@src/shared/infrastructure/persistence/mongo/mongoRepository';
import { Document } from 'mongodb';

export default class MongoTermRepository extends MongoRepository<Term> implements TermRepository {
  constructor() {
    super('terms');
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
        doc.favourites
      );
    });

    return terms;
  }
}
