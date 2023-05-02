import { expect, jest } from '@jest/globals';
import Word from '@src/languages/domain/word/word';
import WordRepository from '@src/languages/domain/word/wordRepository';

export class WordRepositoryMock implements WordRepository {
  private mockSave = jest.fn();
  private mockFindById = jest.fn();

  findById(id: string): Promise<Word | null> {
    this.assertFindById(id);
    return Promise.resolve(null);
  }

  assertFindById(id: string) {
    expect(this.mockFindById).toHaveBeenCalledWith(id);
  }

  async save(word: Word): Promise<any> {
    this.mockSave(word);
  }

  assertSaveHasBeenCalledWith(word: Word): void {
    expect(this.mockSave).toHaveBeenCalledWith(word);
  }
}
