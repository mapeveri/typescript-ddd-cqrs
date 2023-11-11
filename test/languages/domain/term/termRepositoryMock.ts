import { expect, jest } from '@jest/globals';
import Term from '@src/languages/domain/term/term';
import TermRepository from '@src/languages/domain/term/termRepository';

export class TermRepositoryMock implements TermRepository {
  private searchMock: jest.Mock;
  private saveMock: jest.Mock;
  private terms: Term[] = [];

  constructor() {
    this.searchMock = jest.fn();
    this.saveMock = jest.fn();
  }

  returnOnSearch(terms: Term[]) {
    this.terms = terms;
  }

  async search(term: string): Promise<Term[] | null> {
    this.searchMock(term);
    return this.terms;
  }

  async save(term: Term): Promise<void> {
    this.saveMock(term);
  }

  expectSearchCalledWith(termToSearch: string): void {
    expect(this.searchMock).toHaveBeenCalledWith(termToSearch);
  }
}
