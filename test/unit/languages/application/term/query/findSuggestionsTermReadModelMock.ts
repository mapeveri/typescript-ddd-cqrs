import { TermView } from '@src/languages/application/term/query/termView';
import UserId from '@src/account/domain/user/userId';
import FindSuggestionsTermReadModel from '@src/languages/application/term/query/findSuggestionsTermReadModel';

export class FindSuggestionsTermReadModelMock implements FindSuggestionsTermReadModel {
  private terms: TermView[];

  constructor() {
    this.terms = [];
  }

  add(term: TermView) {
    this.terms.push(term);
  }

  clean(): void {
    this.terms = [];
  }

  async find(_userId: UserId): Promise<TermView[]> {
    return Promise.resolve(this.terms);
  }
}
