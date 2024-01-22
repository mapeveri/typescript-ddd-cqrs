import WordRepository from '@src/languages/domain/term/word/wordRepository';
import Word from '@src/languages/domain/term/word/word';
import WordId from '@src/languages/domain/term/word/valueObjects/wordId';
import TypeOrmRepository from '@src/shared/infrastructure/persistence/typeOrm/typeOrmRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TypeOrmWordRepository extends TypeOrmRepository implements WordRepository {
  constructor() {
    super();
  }

  async findById(id: WordId): Promise<Word | null> {
    return await this.em.findOne(Word, { where: { id: id } } as any);
  }

  async remove(word: Word): Promise<void> {
    await this.em.remove(word);
  }

  async save(word: Word): Promise<any> {
    return await this.em.save(word);
  }
}
