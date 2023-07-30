import WordId from './valueObjects/wordId';
import Word from './word';

interface WordRepository {
  findById(id: WordId): Promise<Word | null>;

  save(word: Word): Promise<void>;
}

export default WordRepository;

export const WORD_REPOSITORY = Symbol('WordRepository');
