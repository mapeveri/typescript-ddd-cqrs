import { FIND_SUGGESTIONS_TERM_READ_MODEL } from '@src/language/application/term/query/findSuggestionsTermReadModel';
import MongoFindSuggestionsTermReadModel from '@src/language/infrastructure/persistence/mongo/readModels/mongoFindSuggestionsTermReadModel';
import { SEARCH_TERM_VIEW_READ_MODEL } from '@src/language/application/term/query/searchTermViewReadModel';
import MongoSearchTermViewReadModel from '@src/language/infrastructure/persistence/mongo/readModels/mongoSearchTermViewReadModel';

export const readModels = [
  {
    provide: FIND_SUGGESTIONS_TERM_READ_MODEL,
    useClass: MongoFindSuggestionsTermReadModel,
  },
  {
    provide: SEARCH_TERM_VIEW_READ_MODEL,
    useClass: MongoSearchTermViewReadModel,
  },
];
