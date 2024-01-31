import { Injectable } from '@nestjs/common';
import TermView from '@src/languages/application/term/viewModel/termView';
import MongoRepository from '@src/shared/infrastructure/persistence/mongo/mongoRepository';
import TermViewSaver from '@src/languages/application/term/projection/create/termViewSaver';

@Injectable()
export default class MongoTermViewSaver extends MongoRepository<TermView> implements TermViewSaver {
  constructor() {
    super('terms');
  }
}
