import { expect, jest } from '@jest/globals';
import Term from '@src/languages/domain/term/term';
import TermRepository from '@src/languages/domain/term/termRepository';

export class TermRepositoryMock implements TermRepository {
  search: jest.MockedFunction<(term: string) => Promise<Term[] | null>>;
  save: jest.MockedFunction<(term: Term) => Promise<void>>;

  constructor() {
    this.search = jest.fn();
    this.save = jest.fn();
  }

  expectSearchCalledWith(termToSearch: string): void {
    expect(this.search).toHaveBeenCalledWith(termToSearch);
  }
}
