import { FIND_SUGGESTIONS_TERM_READ_MODEL } from '@src/languages/application/term/query/findSuggestionsTermReadModel';
import MongoFindSuggestionsTermReadModel from '@src/languages/infrastructure/persistence/mongo/readModels/mongoFindSuggestionsTermReadModel';
import { SEARCH_TERM_VIEW_READ_MODEL } from '@src/languages/application/term/query/searchTermViewReadModel';
import MongoSearchTermViewReadModel from '@src/languages/infrastructure/persistence/mongo/readModels/mongoSearchTermViewReadModel';

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
