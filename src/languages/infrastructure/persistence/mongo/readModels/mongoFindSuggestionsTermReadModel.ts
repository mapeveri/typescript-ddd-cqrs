import FindSuggestionsTermReadModel from '@src/languages/application/term/query/findSuggestionsTermReadModel';
import UserId from '@src/account/domain/user/userId';
import { TermView } from '@src/languages/application/term/query/termView';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import { Document } from 'mongodb';
import MongoConnection, { MONGO_CLIENT } from '@src/shared/infrastructure/persistence/mongo/mongoConnection';
import CollaboratorRepository, {
  COLLABORATOR_REPOSITORY,
} from '@src/languages/domain/collaborator/collaboratorRepository';
import Collaborator from '@src/languages/domain/collaborator/collaborator';
import CollaboratorDoesNotExistsException from '@src/languages/domain/collaborator/collaboratorDoesNotExistsException';
import CollaboratorId from '@src/languages/domain/collaborator/collaboratorId';

export default class MongoFindSuggestionsTermReadModel implements FindSuggestionsTermReadModel {
  constructor(
    @Inject(MONGO_CLIENT) private readonly mongo: MongoConnection,
    @Inject(COLLABORATOR_REPOSITORY) private readonly collaboratorRepository: CollaboratorRepository,
  ) {}

  async find(userId: UserId): Promise<TermView[]> {
    const collaborator = await this.getCollaborator(userId);

    const result = await this.mongo.db
      .collection('terms')
      .find({
        $or: [{ hashtags: collaborator.getInterests() }],
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

  async getCollaborator(collaboratorId: CollaboratorId): Promise<Collaborator> {
    const collaborator = await this.collaboratorRepository.findById(collaboratorId);
    if (null === collaborator) {
      throw new CollaboratorDoesNotExistsException(collaboratorId.toString());
    }

    return collaborator;
  }
}
