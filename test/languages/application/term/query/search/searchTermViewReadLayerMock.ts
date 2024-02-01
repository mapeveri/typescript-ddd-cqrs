import { jest } from '@jest/globals';
import { TermView } from '@src/languages/application/term/viewModel/termView';
import SearchTermViewReadLayer, {
  TermCriteriaParams,
} from '@src/languages/application/term/query/search/searchTermViewReadLayer';

export class SearchTermViewReadLayerMock implements SearchTermViewReadLayer {
  private searchMock: jest.Mock;
  private saveMock: jest.Mock;
  private terms: TermView[];

  constructor() {
    this.searchMock = jest.fn();
    this.saveMock = jest.fn();
    this.terms = [];
  }

  add(term: TermView) {
    this.terms.push(term);
  }

  async search(criteria: TermCriteriaParams): Promise<TermView[]> {
    this.searchMock(criteria);
    return this.terms;
  }

  async save(term: TermView): Promise<void> {
    this.saveMock(term);
  }
}
