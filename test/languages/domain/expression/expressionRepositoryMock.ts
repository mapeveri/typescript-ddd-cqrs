import { expect, jest } from '@jest/globals';
import Expression from '@src/languages/domain/term/expression/expression';
import ExpressionRepository from '@src/languages/domain/term/expression/expressionRepository';
import ExpressionId from '@src/languages/domain/term/expression/valueObjects/expressionId';

export class ExpressionRepositoryMock implements ExpressionRepository {
  private findByIdMock: jest.Mock;
  private saveMock: jest.Mock;
  private removeMock: jest.Mock;
  private expressions: Expression[];

  constructor() {
    this.findByIdMock = jest.fn();
    this.saveMock = jest.fn();
    this.removeMock = jest.fn();
    this.expressions = [];
  }

  add(expression: Expression) {
    this.expressions.push(expression);
  }

  async findById(id: ExpressionId): Promise<Expression | null> {
    this.findByIdMock(id);
    return this.expressions.length > 0 ? this.expressions[0] : null;
  }

  async remove(expression: Expression): Promise<void> {
    this.removeMock(expression);
  }

  async save(expression: Expression): Promise<void> {
    this.saveMock(expression);
  }

  shouldStore(expression: Expression): void {
    expect(this.saveMock).toHaveBeenCalledWith(expression);
  }

  shouldNotStore(): void {
    expect(this.saveMock).not.toHaveBeenCalled();
  }

  shouldRemove(expression: Expression): void {
    expect(this.removeMock).toHaveBeenCalledWith(expression);
  }

  shouldNotRemove(): void {
    expect(this.removeMock).not.toHaveBeenCalled();
  }
}
