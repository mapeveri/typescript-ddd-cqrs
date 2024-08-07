import { jest } from '@jest/globals';
import { TermView } from '@src/languages/application/term/query/view/termView';
import SearchTermViewReadLayer, {
  TermCriteriaParams,
} from '@src/languages/application/term/query/searchTermViewReadLayer';

export class SearchTermViewReadLayerMock implements SearchTermViewReadLayer {
  private searchMock: jest.Mock;
  private saveMock: jest.Mock;
  private terms: TermView[];

  constructor() {
    this.searchMock = jest.fn();
    this.saveMock = jest.fn();
    this.terms = [];
  }

  add(term: TermView): void {
    this.terms.push(term);
  }

  clean(): void {
    this.searchMock = jest.fn();
    this.saveMock = jest.fn();
    this.terms = [];
  }

  async search(criteria: TermCriteriaParams): Promise<TermView[]> {
    this.searchMock(criteria);
    return this.terms;
  }

  async save(term: TermView): Promise<void> {
    this.saveMock(term);
  }
}
