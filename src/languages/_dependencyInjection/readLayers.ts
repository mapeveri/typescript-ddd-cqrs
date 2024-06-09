import { FIND_SUGGESTIONS_TERM_READ_LAYER } from '@src/languages/application/term/query/findSuggestionsTermReadLayer';
import MongoFindSuggestionsTermReadLayer from '@src/languages/infrastructure/persistence/mongo/readLayer/mongoFindSuggestionsTermReadLayer';
import { SEARCH_TERM_VIEW_READ_LAYER } from '@src/languages/application/term/query/searchTermViewReadLayer';
import MongoSearchTermViewReadLayer from '@src/languages/infrastructure/persistence/mongo/readLayer/mongoSearchTermViewReadLayer';

export const readLayers = [
  {
    provide: FIND_SUGGESTIONS_TERM_READ_LAYER,
    useClass: MongoFindSuggestionsTermReadLayer,
  },
  {
    provide: SEARCH_TERM_VIEW_READ_LAYER,
    useClass: MongoSearchTermViewReadLayer,
  },
];
