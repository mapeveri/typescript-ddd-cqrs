import { TermView } from '@src/languages/application/term/query/view/termView';
import SearchTermViewReadLayer, {
  TermCriteriaParams,
} from '@src/languages/application/term/query/searchTermViewReadLayer';

export class SearchTermViewReadLayerMock implements SearchTermViewReadLayer {
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
