import Expression from './expression';
import ExpressionId from './valueObjects/expressionId';

interface ExpressionRepository {
  findById(id: ExpressionId): Promise<Expression | null>;

  save(expression: Expression): Promise<void>;
}

export default ExpressionRepository;

export const EXPRESSION_REPOSITORY = Symbol('ExpressionRepository');
