import { TermView } from '@src/language/application/term/query/termView';
import UserId from '@src/account/domain/user/userId';

interface FindSuggestionsTermReadModel {
  find(userId: UserId): Promise<TermView[]>;
}

export default FindSuggestionsTermReadModel;

export const FIND_SUGGESTIONS_TERM_READ_MODEL = Symbol('FindSuggestionsTermReadModel');
