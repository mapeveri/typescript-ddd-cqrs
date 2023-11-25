import { expect, jest } from '@jest/globals';
import WordId from '@src/languages/domain/word/valueObjects/wordId';
import Word from '@src/languages/domain/word/word';
import WordRepository from '@src/languages/domain/word/wordRepository';

export class WordRepositoryMock implements WordRepository {
  private findByIdMock: jest.Mock;
  private saveMock: jest.Mock;
  private removeMock: jest.Mock;
  private words: Word[];

  constructor() {
    this.findByIdMock = jest.fn();
    this.saveMock = jest.fn();
    this.removeMock = jest.fn();
    this.words = [];
  }

  add(word: Word) {
    this.words.push(word);
  }

  async findById(id: WordId): Promise<Word | null> {
    this.findByIdMock(id);
    return this.words.length > 0 ? this.words[0] : null;
  }

  async remove(word: Word): Promise<void> {
    this.removeMock(word);
  }

  async save(word: Word): Promise<void> {
    this.saveMock(word);
  }

  shouldStore(word: Word): void {
    expect(this.saveMock).toHaveBeenCalledWith(word);
  }

  shouldNotStore(): void {
    expect(this.saveMock).not.toHaveBeenCalled();
  }

  shouldRemove(word: Word): void {
    expect(this.removeMock).toHaveBeenCalledWith(word);
  }

  shouldNotRemove(): void {
    expect(this.removeMock).not.toHaveBeenCalled();
  }
}
