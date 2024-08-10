import { TermView } from '@src/languages/application/term/query/view/termView';
import UserId from '@src/languages/domain/user/userId';
import FindSuggestionsTermReadLayer from '@src/languages/application/term/query/findSuggestionsTermReadLayer';

export class FindSuggestionsTermReadLayerMock implements FindSuggestionsTermReadLayer {
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
