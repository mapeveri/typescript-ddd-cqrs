import TermView from '@src/languages/application/term/viewModel/termView';
import UserId from '@src/languages/domain/user/userId';

interface FindSuggestionsTermReadLayer {
  find(userId: UserId): Promise<TermView[]>;
}

export default FindSuggestionsTermReadLayer;

export const FIND_SUGGESTIONS_TERM_READ_LAYER = Symbol('FindSuggestionsTermReadLayer');
