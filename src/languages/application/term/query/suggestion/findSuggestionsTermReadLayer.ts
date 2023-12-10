import Term from '@src/languages/domain/term/term';
import UserId from '@src/languages/domain/user/valueObjects/userId';

interface FindSuggestionsTermReadLayer {
  find(userId: UserId): Promise<Term[]>;
}

export default FindSuggestionsTermReadLayer;

export const FIND_SUGGESTIONS_TERM_READ_LAYER = Symbol('FindSuggestionsTermReadLayer');
