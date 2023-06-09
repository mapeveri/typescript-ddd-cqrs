import { expect, jest } from '@jest/globals';
import WordId from '@src/languages/domain/word/valueObjects/wordId';
import Word from '@src/languages/domain/word/word';
import WordRepository from '@src/languages/domain/word/wordRepository';

export class WordRepositoryMock implements WordRepository {
  findById: jest.MockedFunction<(id: WordId) => Promise<Word | null>>;
  save: jest.MockedFunction<(word: Word) => Promise<void>>;

  constructor() {
    this.findById = jest.fn();
    this.save = jest.fn();
  }

  expectSaveCalledWith(word: Word): void {
    expect(this.save).toHaveBeenCalledWith(word);
  }
}
