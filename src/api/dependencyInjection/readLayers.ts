import { FIND_SUGGESTIONS_TERM_READ_LAYER } from '@src/languages/application/term/query/suggestion/findSuggestionsTermReadLayer';
import MongoFindSuggestionsTermReadLayer from '@src/languages/infrastructure/readLayer/mongoFindSuggestionsTermReadLayer';

export const readLayers = [
  {
    provide: FIND_SUGGESTIONS_TERM_READ_LAYER,
    useClass: MongoFindSuggestionsTermReadLayer,
  },
];
