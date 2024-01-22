import ExpressionRepository from '@src/languages/domain/term/expression/expressionRepository';
import ExpressionId from '@src/languages/domain/term/expression/valueObjects/expressionId';
import Expression from '@src/languages/domain/term/expression/expression';
import TypeOrmRepository from '@src/shared/infrastructure/persistence/typeOrm/typeOrmRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TypeOrmExpressionRepository extends TypeOrmRepository implements ExpressionRepository {
  constructor() {
    super();
  }

  async findById(id: ExpressionId): Promise<Expression | null> {
    return await this.em.findOne(Expression, { where: { id: id } } as any);
  }

  async remove(expression: Expression): Promise<void> {
    await this.em.remove(expression);
  }

  async save(expression: Expression): Promise<any> {
    return await this.em.save(expression);
  }
}
