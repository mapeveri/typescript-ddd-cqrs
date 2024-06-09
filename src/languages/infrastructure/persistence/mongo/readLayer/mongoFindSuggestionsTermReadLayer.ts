import FindSuggestionsTermReadLayer from '@src/languages/application/term/query/findSuggestionsTermReadLayer';
import UserId from '@src/languages/domain/user/userId';
import { TermView } from '@src/languages/application/term/view/termView';
import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import UserFinder from '@src/languages/domain/user/userFinder';
import { Document } from 'mongodb';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';

export default class MongoFindSuggestionsTermReadLayer implements FindSuggestionsTermReadLayer {
  private readonly userFinder: UserFinder;

  constructor(
    @Inject(MONGO_CLIENT) private readonly mongo: MongoConnection,
    @Inject(USER_REPOSITORY) userRepository: UserRepository,
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async find(userId: UserId): Promise<TermView[]> {
    const user = await this.userFinder.find(userId);

    const result = await this.mongo.db
      .collection('terms')
      .find({
        $or: [{ hashtags: user.interests }],
      })
      .project({ _id: 0 })
      .sort(['createdAt', -1])
      .skip(0)
      .limit(5)
      .toArray();

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
}
