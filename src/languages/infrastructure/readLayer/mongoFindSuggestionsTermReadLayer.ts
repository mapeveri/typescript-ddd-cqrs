import FindSuggestionsTermReadLayer from '@src/languages/application/term/query/suggestion/findSuggestionsTermReadLayer';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import Term from '@src/languages/domain/term/term';
import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermRepository, { TERM_REPOSITORY } from '@src/languages/domain/term/termRepository';
import UserFinder from '@src/languages/domain/user/services/userFinder';
import TermCriteria from '@src/languages/domain/term/termCriteria';

export default class MongoFindSuggestionsTermReadLayer implements FindSuggestionsTermReadLayer {
  private readonly userFinder: UserFinder;

  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermRepository,
    @Inject(USER_REPOSITORY) userRepository: UserRepository,
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async find(userId: UserId): Promise<Term[]> {
    const user = await this.userFinder.find(userId);

    const criteria = TermCriteria.from({ hashtags: user.interests, size: 5, page: 1 });
    const terms = await this.termRepository.search(criteria);

    return Promise.resolve(terms);
  }
}
