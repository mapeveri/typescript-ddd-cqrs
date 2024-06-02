import { TERM_VIEW_SAVER } from '@src/languages/infrastructure/projection/termViewSaver';
import MongoTermViewSaver from '@src/languages/infrastructure/persistence/mongo/service/mongoTermViewSaver';

export const services = [
  {
    provide: TERM_VIEW_SAVER,
    useClass: MongoTermViewSaver,
  },
];
