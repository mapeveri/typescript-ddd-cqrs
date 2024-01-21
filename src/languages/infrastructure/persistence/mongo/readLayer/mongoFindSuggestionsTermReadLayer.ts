import FindSuggestionsTermReadLayer from '@src/languages/application/term/query/suggestion/findSuggestionsTermReadLayer';
import UserId from '@src/languages/domain/user/valueObjects/userId';
import TermView from '@src/languages/application/term/projection/termView';
import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import TermViewRepository, { TERM_REPOSITORY } from '@src/languages/application/term/projection/termViewRepository';
import UserFinder from '@src/languages/domain/user/services/userFinder';
import TermViewCriteria from '@src/languages/application/term/projection/termViewCriteria';

export default class MongoFindSuggestionsTermReadLayer implements FindSuggestionsTermReadLayer {
  private readonly userFinder: UserFinder;

  constructor(
    @Inject(TERM_REPOSITORY) private readonly termRepository: TermViewRepository,
    @Inject(USER_REPOSITORY) userRepository: UserRepository,
  ) {
    this.userFinder = new UserFinder(userRepository);
  }

  async find(userId: UserId): Promise<TermView[]> {
    const user = await this.userFinder.find(userId);

    const criteria = TermViewCriteria.from({
      hashtags: user.interests,
      size: 5,
      page: 1,
      orderBy: { key: 'createdAt', orderType: 'desc' },
    });
    const terms = await this.termRepository.search(criteria);

    return Promise.resolve(terms);
  }
}
