import { Injectable } from '@nestjs/common';
import { TermView } from '@src/languages/application/term/viewModel/termView';
import SearchTermViewReadLayer, {
  TermCriteriaParams,
} from '@src/languages/application/term/query/search/searchTermViewReadLayer';
import { Document } from 'mongodb';
import { SortDirection } from 'typeorm';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';

@Injectable()
export default class MongoSearchTermViewReadLayer implements SearchTermViewReadLayer {
  constructor(@Inject(MONGO_CLIENT) private readonly mongo: MongoConnection) {}

  async search(criteria: TermCriteriaParams): Promise<TermView[]> {
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

    const queryProject = this.mongo.db.collection('terms').find(searchQuery).project({ _id: 0 });

    if (orderBy) {
      const sortOptions: [string, SortDirection][] = [];
      sortOptions.push([orderBy.key, orderBy.orderType === 'asc' ? 1 : -1]);

      queryProject.sort(sortOptions);
    }

    const skip = (criteria.page - 1) * criteria.size;
    const query = queryProject.skip(skip).limit(criteria.size);
    result = await query.toArray();

    return result.map((doc: Document) => {
      return {
        id: doc.id,
        title: doc.title,
        description: doc.description,
        example: doc.example,
        type: doc.type,
        hashtags: doc.hashtags,
        totalLikes: doc.totalLikes,
        createdAt: doc.createdAt,
      };
    });
  }
}
