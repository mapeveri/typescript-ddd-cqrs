import { expect, jest } from '@jest/globals';
import Expression from '@src/languages/domain/expression/expression';
import ExpressionRepository from '@src/languages/domain/expression/expressionRepository';
import ExpressionId from '@src/languages/domain/expression/valueObjects/expressionId';

export class ExpressionRepositoryMock implements ExpressionRepository {
  private mockSave = jest.fn();
  private mockFindById = jest.fn();

  findById(id: ExpressionId): Promise<Expression | null> {
    this.assertFindById(id);
    return Promise.resolve(null);
  }

  assertFindById(id: ExpressionId) {
    expect(this.mockFindById).toHaveBeenCalledWith(id);
  }

  async save(expression: Expression): Promise<any> {
    this.mockSave(expression);
  }

  assertSaveHasBeenCalledWith(expression: Expression): void {
    expect(this.mockSave).toHaveBeenCalledWith(expression);
  }
}
