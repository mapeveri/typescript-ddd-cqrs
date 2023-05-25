import { Repository } from 'typeorm';
import WordEntity from '../entities/word';
import AppDataSource from '@src/shared/infrastructure/persistence/typeOrm/dataSource';
import WordRepository from '@src/languages/domain/word/wordRepository';
import Word from '@src/languages/domain/word/word';
import WordId from '@src/languages/domain/word/valueObjects/wordId';

export default class TypeOrmWordRepository implements WordRepository {
  private repository: Repository<Word>;

  constructor() {
    this.repository = AppDataSource.manager.getRepository(WordEntity);
  }

  async findById(id: WordId): Promise<Word | null> {
    return await this.repository.findOne({ where: { id: id } as any });
  }

  async save(word: Word): Promise<any> {
    return await this.repository.save(word);
  }
}
