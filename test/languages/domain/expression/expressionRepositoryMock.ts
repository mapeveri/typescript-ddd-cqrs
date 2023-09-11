import { expect, jest } from '@jest/globals';
import Expression from '@src/languages/domain/expression/expression';
import ExpressionRepository from '@src/languages/domain/expression/expressionRepository';
import ExpressionId from '@src/languages/domain/expression/valueObjects/expressionId';

export class ExpressionRepositoryMock implements ExpressionRepository {
  findById: jest.MockedFunction<(id: ExpressionId) => Promise<Expression | null>>;
  save: jest.MockedFunction<(expression: Expression) => Promise<void>>;
  delete: jest.MockedFunction<(expression: Expression) => Promise<void>>;

  constructor() {
    this.findById = jest.fn();
    this.save = jest.fn();
    this.delete = jest.fn();
  }

  expectSaveCalledWith(expression: Expression): void {
    expect(this.save).toHaveBeenCalledWith(expression);
  }

  expectSaveNotCalled(): void {
    expect(this.save).not.toHaveBeenCalled();
  }

  expectDeleteCalledWith(expression: Expression): void {
    expect(this.delete).toHaveBeenCalledWith(expression);
  }

  expectDeleteNotCalled(): void {
    expect(this.delete).not.toHaveBeenCalled();
  }
}
