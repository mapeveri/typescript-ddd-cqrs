import { expect, jest } from '@jest/globals';
import WordId from '@src/languages/domain/word/valueObjects/wordId';
import Word from '@src/languages/domain/word/word';
import WordRepository from '@src/languages/domain/word/wordRepository';

export class WordRepositoryMock implements WordRepository {
  private findByIdMock: jest.Mock;
  private saveMock: jest.Mock;
  private removeMock: jest.Mock;
  private word: Word | null;

  constructor() {
    this.findByIdMock = jest.fn();
    this.saveMock = jest.fn();
    this.removeMock = jest.fn();
  }

  returnOnFindById(word?: Word | null) {
    this.word = word ? word : null;
  }

  async findById(id: WordId): Promise<Word | null> {
    this.findByIdMock(id);
    return this.word;
  }

  async remove(word: Word): Promise<void> {
    this.removeMock(word);
  }

  async save(word: Word): Promise<void> {
    this.saveMock(word);
  }

  expectSaveCalledWith(word: Word): void {
    expect(this.saveMock).toHaveBeenCalledWith(word);
  }

  expectSaveNotCalled(): void {
    expect(this.saveMock).not.toHaveBeenCalled();
  }

  expectRemoveCalledWith(word: Word): void {
    expect(this.removeMock).toHaveBeenCalledWith(word);
  }

  expectRemoveNotCalled(): void {
    expect(this.removeMock).not.toHaveBeenCalled();
  }
}
