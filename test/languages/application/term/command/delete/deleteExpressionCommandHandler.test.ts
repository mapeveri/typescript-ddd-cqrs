import { beforeEach, describe, it } from '@jest/globals';
import ExpressionMother from '@test/languages/domain/term/expression/expressionMother';
import DeleteExpressionCommandHandler from '@src/languages/application/term/command/delete/deleteExpressionCommandHandler';
import { DeleteExpressionCommandMother } from './deleteExpressionCommandMother';
import { TermRepositoryMock } from '@test/languages/domain/term/termRepositoryMock';

describe('DeleteExpressionCommandHandler', () => {
  let termRepository: TermRepositoryMock;
  let deleteExpressionCommandHandler: DeleteExpressionCommandHandler;

  beforeEach(() => {
    termRepository = new TermRepositoryMock();

    deleteExpressionCommandHandler = new DeleteExpressionCommandHandler(termRepository);
  });

  describe('execute', () => {
    it('should not remove when expression id does not exists', async () => {
      const expression = ExpressionMother.random();
      const command = DeleteExpressionCommandMother.random(expression.id.value);

      await deleteExpressionCommandHandler.execute(command);

      termRepository.shouldNotRemove();
    });

    it('should remove an expression', async () => {
      const expression = ExpressionMother.random();
      const command = DeleteExpressionCommandMother.random(expression.id.value);
      termRepository.add(expression);

      await deleteExpressionCommandHandler.execute(command);

      termRepository.shouldRemove(expression);
    });
  });
});
