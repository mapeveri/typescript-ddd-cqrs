import { Injectable } from '@nestjs/common';
import TermView from '@src/languages/application/term/projection/termView';
import TermViewRepository from '@src/languages/application/term/projection/termViewRepository';
import MongoRepository from '@src/shared/infrastructure/persistence/mongo/mongoRepository';
import { Document } from 'mongodb';
import TermViewCriteria from '@src/languages/application/term/projection/termViewCriteria';
import { SortDirection } from 'typeorm';

@Injectable()
export default class MongoTermViewRepository extends MongoRepository<TermView> implements TermViewRepository {
  constructor() {
    super('terms');
  }

  async search(criteria: TermViewCriteria): Promise<TermView[]> {
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
      sortOptions.push([orderBy.key, orderBy.orderType === 'asc' ? 1 : -1]);

      queryProject.sort(sortOptions);
    }

    const skip = (criteria.page - 1) * criteria.size;
    const query = queryProject.skip(skip).limit(criteria.size);
    result = await query.toArray();

    return result.map((doc: Document) => {
      return TermView.create(
        doc.id,
        doc.title,
        doc.description,
        doc.example,
        doc.type,
        doc.hashtags,
        doc.totalLikes,
        new Date(doc.createdAt),
      );
    });
  }
}
