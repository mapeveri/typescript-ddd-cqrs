import FindSuggestionsTermReadLayer from '@src/languages/application/term/query/suggestion/findSuggestionsTermReadLayer';
import UserId from '@src/languages/domain/user/userId';
import TermView from '@src/languages/application/term/viewModel/termView';
import UserRepository, { USER_REPOSITORY } from '@src/languages/domain/user/userRepository';
import { Inject } from '@src/shared/domain/injector/inject.decorator';
import SearchTermViewReadLayer, {
  SEARCH_TERM_VIEW_READ_LAYER,
} from '@src/languages/application/term/query/search/searchTermViewReadLayer';
import UserFinder from '@src/languages/domain/user/userFinder';
import TermViewCriteria from '@src/languages/application/term/query/search/termViewCriteria';

export default class MongoFindSuggestionsTermReadLayer implements FindSuggestionsTermReadLayer {
  private readonly userFinder: UserFinder;

  constructor(
    @Inject(SEARCH_TERM_VIEW_READ_LAYER) private readonly termRepository: SearchTermViewReadLayer,
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
