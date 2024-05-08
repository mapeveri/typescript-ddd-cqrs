import { beforeEach, describe, it } from '@jest/globals';
import DeleteExpressionCommandHandler from '@src/languages/application/term/command/expression/deleteExpressionCommandHandler';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import ExpressionMother from '@test/unit/languages/domain/term/expression/expressionMother';
import { DeleteExpressionCommandMother } from '@test/unit/languages/application/term/command/expression/deleteExpressionCommandMother';

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
