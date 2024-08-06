import { expect, jest } from '@jest/globals';
import TermRepository from '@src/languages/domain/term/termRepository';
import TermId from '@src/languages/domain/term/termId';
import Term from '@src/languages/domain/term/term';

export class TermRepositoryMock implements TermRepository {
  private findByIdMock: jest.Mock;
  private saveMock: jest.Mock;
  private removeMock: jest.Mock;
  private terms: Term[];

  constructor() {
    this.findByIdMock = jest.fn();
    this.saveMock = jest.fn();
    this.removeMock = jest.fn();
    this.terms = [];
  }

  add(term: Term) {
    this.terms.push(term);
  }

  clean(): void {
    this.findByIdMock = jest.fn();
    this.saveMock = jest.fn();
    this.removeMock = jest.fn();
    this.terms = [];
  }

  async findById(id: TermId): Promise<Term | null> {
    this.findByIdMock(id);
    return this.terms.length > 0 ? this.terms[0] : null;
  }

  async remove(term: Term): Promise<void> {
    this.removeMock(term);
  }

  async save(term: Term): Promise<void> {
    this.saveMock(term);
  }

  shouldStore(term: Term): void {
    expect(this.saveMock).toHaveBeenCalledWith(term);
  }

  shouldNotStore(): void {
    expect(this.saveMock).not.toHaveBeenCalled();
  }

  shouldRemove(term: Term): void {
    expect(this.removeMock).toHaveBeenCalledWith(term);
  }

  shouldNotRemove(): void {
    expect(this.removeMock).not.toHaveBeenCalled();
  }
}
