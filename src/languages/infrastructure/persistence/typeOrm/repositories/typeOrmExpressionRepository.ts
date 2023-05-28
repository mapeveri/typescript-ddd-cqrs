import { Repository } from 'typeorm';
import ExpressionEntity from '../entities/expression';
import AppDataSource from '@src/shared/infrastructure/persistence/typeOrm/dataSource';
import ExpressionRepository from '@src/languages/domain/expression/expressionRepository';
import ExpressionId from '@src/languages/domain/expression/valueObjects/expressionId';
import Expression from '@src/languages/domain/expression/expression';

export default class TypeOrmExpressionRepository implements ExpressionRepository {
  private repository: Repository<Expression>;

  constructor() {
    this.repository = AppDataSource.manager.getRepository(ExpressionEntity);
  }

  async findById(id: ExpressionId): Promise<Expression | null> {
    return await this.repository.findOne({ where: { id: id } as any });
  }

  async save(expression: Expression): Promise<any> {
    return await this.repository.save(expression);
  }
}
