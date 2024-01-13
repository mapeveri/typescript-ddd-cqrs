import { Injectable } from '@nestjs/common';
import Term from '@src/languages/domain/term/term';
import TermRepository from '@src/languages/domain/term/termRepository';
import MongoRepository from '@src/shared/infrastructure/persistence/mongo/mongoRepository';
import { Document } from 'mongodb';
import TermCriteria from '@src/languages/domain/term/termCriteria';
import { SortDirection } from 'typeorm';

@Injectable()
export default class MongoTermRepository extends MongoRepository<Term> implements TermRepository {
  constructor() {
    super('terms');
  }

  async search(criteria: TermCriteria): Promise<Term[]> {
    let result = [];
    const searchQuery = {};
    const term = criteria.term;
    const hashtags = criteria.hashtags;
    const orderBy = criteria.orderBy;

    if (term) {
      const regexTerm = new RegExp(term, 'i');
      Object.assign(searchQuery, {
        $or: [{ title: regexTerm }, { description: regexTerm }, { example: regexTerm }],
      });
    }

    if (hashtags) {
      Object.assign(searchQuery, {
        $or: [{ hashtags: hashtags }],
      });
    }

    const queryProject = this.collection.find(searchQuery).project({ _id: 0 });

    if (orderBy) {
      const sortOptions: [string, SortDirection][] = [];
      sortOptions.push([orderBy.key, orderBy.order === 'asc' ? 1 : -1]);

      queryProject.sort(sortOptions);
    }

    const skip = (criteria.page - 1) * criteria.size;
    const query = queryProject.skip(skip).limit(criteria.size);
    result = await query.toArray();

    return result.map((doc: Document) => {
      return Term.create(
        doc.id,
        doc.title,
        doc.description,
        doc.example,
        doc.type,
        doc.hashtags,
        doc.totalLikes,
        doc.createdAt,
      );
    });
  }
}
