import { jest } from '@jest/globals';
import Term from '@src/languages/domain/term/term';
import TermRepository from '@src/languages/domain/term/termRepository';

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

  async search(term: string): Promise<Term[]> {
    this.searchMock(term);
    return this.terms;
  }

  async save(term: Term): Promise<void> {
    this.saveMock(term);
  }
}
