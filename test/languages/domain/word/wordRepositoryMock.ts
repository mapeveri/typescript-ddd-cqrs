import { expect, jest } from '@jest/globals';
import WordId from '@src/languages/domain/word/valueObjects/wordId';
import Word from '@src/languages/domain/word/word';
import WordRepository from '@src/languages/domain/word/wordRepository';

export class WordRepositoryMock implements WordRepository {
  findById: jest.MockedFunction<(id: WordId) => Promise<Word | null>>;
  save: jest.MockedFunction<(word: Word) => Promise<void>>;
  delete: jest.MockedFunction<(word: Word) => Promise<void>>;

  constructor() {
    this.findById = jest.fn();
    this.save = jest.fn();
    this.delete = jest.fn();
  }

  expectSaveCalledWith(word: Word): void {
    expect(this.save).toHaveBeenCalledWith(word);
  }

  expectSaveNotCalled(): void {
    expect(this.save).not.toHaveBeenCalled();
  }

  expectDeleteCalledWith(word: Word): void {
    expect(this.delete).toHaveBeenCalledWith(word);
  }

  expectDeleteNotCalled(): void {
    expect(this.delete).not.toHaveBeenCalled();
  }
}
