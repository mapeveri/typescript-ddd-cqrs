import TermRepository from '@src/languages/domain/term/termRepository';
import TermId from '@src/languages/domain/term/termId';
import Term from '@src/languages/domain/term/term';

export class TermRepositoryMock implements TermRepository {
  private terms: Term[];
  private storedTerms: Term[];
  private _storedChanged = false;
  private deletedTerms: Term[];
  private _deletedChanged = false;

  constructor() {
    this.terms = [];
    this._storedChanged = false;
    this._deletedChanged = false;
    this.storedTerms = [];
    this.deletedTerms = [];
  }

  stored(): Term[] {
    return this.storedTerms;
  }

  deleted(): Term[] {
    return this.deletedTerms;
  }

  storedChanged(): boolean {
    return this._storedChanged;
  }

  deletedChanged(): boolean {
    return this._deletedChanged;
  }

  add(term: Term): void {
    this.terms.push(term);
  }

  clean(): void {
    this.terms = [];
    this.storedTerms = [];
    this.deletedTerms = [];
    this._storedChanged = false;
    this._deletedChanged = false;
  }

  async findById(_id: TermId): Promise<Term | null> {
    const term = this.terms.length > 0 ? this.terms[0] : null;
    return Promise.resolve(term);
  }

  async remove(term: Term): Promise<void> {
    this._deletedChanged = true;
    this.deletedTerms.push(term);
  }

  save(term: Term): void {
    this._storedChanged = true;
    this.storedTerms.push(term);
  }
}
