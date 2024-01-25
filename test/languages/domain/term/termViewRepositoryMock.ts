import { jest } from '@jest/globals';
import TermView from '@src/languages/application/term/projection/termView';
import TermViewRepository from '@src/languages/application/term/projection/termViewRepository';
import TermViewCriteria from '@src/languages/application/term/projection/termViewCriteria';

export class TermViewRepositoryMock implements TermViewRepository {
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

  async search(criteria: TermViewCriteria): Promise<TermView[]> {
    this.searchMock(criteria);
    return this.terms;
  }

  async save(term: TermView): Promise<void> {
    this.saveMock(term);
  }
}
