import { jest } from '@jest/globals';
import Term from '@src/languages/domain/term/term';
import TermRepository from '@src/languages/domain/term/termRepository';
import TermCriteria from '@src/languages/domain/term/termCriteria';

export class TermRepositoryMock implements TermRepository {
  private searchMock: jest.Mock;
  private saveMock: jest.Mock;
  private terms: Term[];

  constructor() {
    this.searchMock = jest.fn();
    this.saveMock = jest.fn();
    this.terms = [];
  }

  add(term: Term) {
    this.terms.push(term);
  }

  async search(criteria: TermCriteria): Promise<Term[]> {
    this.searchMock(criteria);
    return this.terms;
  }

  async save(term: Term): Promise<void> {
    this.saveMock(term);
  }
}
