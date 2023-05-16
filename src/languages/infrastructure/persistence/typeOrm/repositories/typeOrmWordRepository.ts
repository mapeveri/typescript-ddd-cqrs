import { Repository } from 'typeorm';
import Word from '../../../../domain/word/word';
import WordEntity from '../entities/word';
import AppDataSource from './../../../../../shared/infrastructure/persistence/typeOrm/dataSource';
import WordRepository from './../../../../../languages/domain/word/wordRepository';

export default class TypeOrmWordRepository implements WordRepository {
  private repository: Repository<Word>;

  constructor() {
    this.repository = AppDataSource.manager.getRepository(WordEntity);
  }

  async findById(id: string): Promise<Word | null> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async save(word: Word): Promise<any> {
    return await this.repository.save(word);
  }
}
