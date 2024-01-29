import { FIND_SUGGESTIONS_TERM_READ_LAYER } from '@src/languages/application/term/query/suggestion/findSuggestionsTermReadLayer';
import MongoFindSuggestionsTermReadLayer from '@src/languages/infrastructure/persistence/mongo/readLayer/mongoFindSuggestionsTermReadLayer';
import { TERM_VIEW_READ_LAYER as READ_LAYER_TERM_REPOSITORY } from '@src/languages/application/term/query/termViewReadLayer';
import MongoTermViewRepository from '@src/languages/infrastructure/persistence/mongo/repositories/mongoTermViewRepository';

export const readLayers = [
  {
    provide: FIND_SUGGESTIONS_TERM_READ_LAYER,
    useClass: MongoFindSuggestionsTermReadLayer,
  },
  {
    provide: READ_LAYER_TERM_REPOSITORY,
    useClass: MongoTermViewRepository,
  },
];
