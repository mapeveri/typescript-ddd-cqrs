import FindSuggestionsTermReadModel from '@src/languages/application/term/query/findSuggestionsTermReadModel';
import UserId from '@src/account/domain/user/userId';
import { TermView } from '@src/languages/application/term/query/termView';
import UserRepository, { USER_REPOSITORY } from '@src/account/domain/user/userRepository';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Document } from 'mongodb';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import User from '@src/account/domain/user/user';
import UserDoesNotExistsException from '@src/account/domain/user/userDoesNotExistsException';

export default class MongoFindSuggestionsTermReadModel implements FindSuggestionsTermReadModel {
  constructor(
    @Inject(MONGO_CLIENT) private readonly mongo: MongoConnection,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async find(userId: UserId): Promise<TermView[]> {
    const user = await this.getUser(userId);

    const result = await this.mongo.db
      .collection('terms')
      .find({
        $or: [{ hashtags: user.getInterests() }],
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

  async getUser(userId: UserId): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (null === user) {
      throw new UserDoesNotExistsException(userId.toString());
    }

    return user;
  }
}
