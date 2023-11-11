import { expect, jest } from '@jest/globals';
import Expression from '@src/languages/domain/expression/expression';
import ExpressionRepository from '@src/languages/domain/expression/expressionRepository';
import ExpressionId from '@src/languages/domain/expression/valueObjects/expressionId';

export class ExpressionRepositoryMock implements ExpressionRepository {
  private findByIdMock: jest.Mock;
  private saveMock: jest.Mock;
  private removeMock: jest.Mock;
  private expression: Expression | null;

  constructor() {
    this.findByIdMock = jest.fn();
    this.saveMock = jest.fn();
    this.removeMock = jest.fn();
  }

  returnOnFindById(expression?: Expression | null) {
    this.expression = expression ? expression : null;
  }

  async findById(id: ExpressionId): Promise<Expression | null> {
    this.findByIdMock(id);
    return this.expression;
  }

  async remove(expression: Expression): Promise<void> {
    this.removeMock(expression);
  }

  async save(expression: Expression): Promise<void> {
    this.saveMock(expression);
  }

  expectSaveCalledWith(expression: Expression): void {
    expect(this.saveMock).toHaveBeenCalledWith(expression);
  }

  expectSaveNotCalled(): void {
    expect(this.saveMock).not.toHaveBeenCalled();
  }

  expectRemoveCalledWith(expression: Expression): void {
    expect(this.removeMock).toHaveBeenCalledWith(expression);
  }

  expectRemoveNotCalled(): void {
    expect(this.removeMock).not.toHaveBeenCalled();
  }
}
