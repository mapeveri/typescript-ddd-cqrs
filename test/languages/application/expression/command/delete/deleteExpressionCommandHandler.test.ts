import { beforeEach, describe, it } from '@jest/globals';
import { ExpressionRepositoryMock } from '@test/languages/domain/expression/expressionRepositoryMock';
import ExpressionMother from '@test/languages/domain/expression/expressionMother';
import DeleteExpressionCommandHandler from '@src/languages/application/term/command/delete/deleteExpressionCommandHandler';
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

      await deleteExpressionCommandHandler.execute(command);

      expressionRepository.shouldNotRemove();
    });

    it('should remove an expression', async () => {
      const expression = ExpressionMother.random();
      const command = DeleteExpressionCommandMother.random(expression.id.value);
      expressionRepository.add(expression);

      await deleteExpressionCommandHandler.execute(command);

      expressionRepository.shouldRemove(expression);
    });
  });
});
