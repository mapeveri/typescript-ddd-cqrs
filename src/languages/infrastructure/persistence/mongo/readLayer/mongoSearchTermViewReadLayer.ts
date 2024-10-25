import { Injectable } from '@nestjs/common';
import { TermView } from '@src/languages/application/term/query/termView';
import SearchTermViewReadLayer, {
  TermCriteriaParams,
} from '@src/languages/application/term/query/searchTermViewReadLayer';
import { Document, SortDirection } from 'mongodb';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';

@Injectable()
export default class MongoSearchTermViewReadLayer implements SearchTermViewReadLayer {
  constructor(@Inject(MONGO_CLIENT) private readonly mongo: MongoConnection) {}

  async search(criteria: TermCriteriaParams): Promise<TermView[]> {
    const result = await this.getTermsFromCriteria(criteria);

    return result.map((doc: Document) => {
      return {
        id: doc.id,
        title: doc.title,
        description: doc.description,
        example: doc.example,
        type: doc.type,
        hashtags: doc.hashtags,
        totalLikes: doc.totalLikes,
        likes: doc.likes || [],
        createdAt: doc.createdAt,
      };
    });
  }

  private async getTermsFromCriteria(criteria: TermCriteriaParams): Promise<Document[]> {
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
    return await query.toArray();
  }
}
