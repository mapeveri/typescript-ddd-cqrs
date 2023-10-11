import { beforeEach, describe, it } from '@jest/globals';
import { ExpressionRepositoryMock } from '@test/languages/domain/expression/expressionRepositoryMock';
import ExpressionMother from '@test/languages/domain/expression/expressionMother';
import DeleteExpressionCommandHandler from '@src/languages/application/expression/command/delete/deleteExpressionCommandHandler';
import { DeleteExpressionCommandMother } from './deleteExpressionCommandMother';

describe('DeleteExpressionCommandHandler', () => {
  let expressionRepository: ExpressionRepositoryMock;
  let deleteExpressionCommandHandler: DeleteExpressionCommandHandler;

  beforeEach(() => {
    expressionRepository = new ExpressionRepositoryMock();

    deleteExpressionCommandHandler = new DeleteExpressionCommandHandler(expressionRepository);
  });

  describe('execute', () => {
    it('should not remove when expression id does not exists', async () => {
      const expression = ExpressionMother.random();
      const command = DeleteExpressionCommandMother.random(expression.id.value);
      expressionRepository.findById.mockResolvedValueOnce(null);

      await deleteExpressionCommandHandler.execute(command);

      expressionRepository.expectDeleteNotCalled();
    });

    it('should remove an expression', async () => {
      const expression = ExpressionMother.random();
      const command = DeleteExpressionCommandMother.random(expression.id.value);
      expressionRepository.findById.mockResolvedValueOnce(expression);

      await deleteExpressionCommandHandler.execute(command);

      expressionRepository.expectDeleteCalledWith(expression);
    });
  });
});
