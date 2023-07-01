import ExpressionRepository from '@src/languages/domain/expression/expressionRepository';
import ExpressionId from '@src/languages/domain/expression/valueObjects/expressionId';
import Expression from '@src/languages/domain/expression/expression';
import TypeOrmRepository from '@src/shared/infrastructure/persistence/typeOrm/typeOrmRepository';

export default class TypeOrmExpressionRepository extends TypeOrmRepository implements ExpressionRepository {
  constructor() {
    super();
  }

  async findById(id: ExpressionId): Promise<Expression | null> {
    return await this.em.findOne(Expression, { where: { id: id } } as any);
  }

  async save(expression: Expression): Promise<any> {
    return await this.em.save(expression);
  }
}
