import { TermView } from '@src/languages/application/term/query/termView';
import SearchTermViewReadModel, {
  TermCriteriaParams,
} from '@src/languages/application/term/query/searchTermViewReadModel';

export class SearchTermViewReadModelMock implements SearchTermViewReadModel {
  private terms: TermView[];

  constructor() {
    this.terms = [];
  }

  add(term: TermView): void {
    this.terms.push(term);
  }

  clean(): void {
    this.terms = [];
  }

  async search(_criteria: TermCriteriaParams): Promise<TermView[]> {
    return Promise.resolve(this.terms);
  }
}
