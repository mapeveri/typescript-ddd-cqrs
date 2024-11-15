import { FIND_SUGGESTIONS_TERM_READ_MODEL } from '@src/languages/application/term/query/findSuggestionsTermReadModel';
import MongoFindSuggestionsTermReadModel from '@src/languages/infrastructure/persistence/mongo/readLayer/mongoFindSuggestionsTermReadModel';
import { SEARCH_TERM_VIEW_READ_LAYER } from '@src/languages/application/term/query/searchTermViewReadLayer';
import MongoSearchTermViewReadLayer from '@src/languages/infrastructure/persistence/mongo/readLayer/mongoSearchTermViewReadLayer';

export const readLayers = [
  {
    provide: FIND_SUGGESTIONS_TERM_READ_MODEL,
    useClass: MongoFindSuggestionsTermReadModel,
  },
  {
    provide: SEARCH_TERM_VIEW_READ_LAYER,
    useClass: MongoSearchTermViewReadLayer,
  },
];
