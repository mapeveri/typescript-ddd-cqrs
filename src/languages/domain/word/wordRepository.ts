import Word from './word';

interface WordRepository {
  findById(id: string): Promise<Word | null>;

  save(word: Word): Promise<void>;
}

export default WordRepository;
