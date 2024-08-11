import { beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import DeleteExpressionCommandHandler from '@src/languages/application/term/command/expression/deleteExpressionCommandHandler';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import ExpressionMother from '@test/unit/languages/domain/term/expression/expressionMother';
import { DeleteExpressionCommandMother } from '@test/unit/languages/application/term/command/expression/deleteExpressionCommandMother';
import DeleteExpressionCommand from '@src/languages/application/term/command/expression/deleteExpressionCommand';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import Expression from '@src/languages/domain/term/expression/expression';

describe('Given a DeleteExpressionCommandHandler to handle', () => {
  let termRepository: TermRepositoryMock;
  let handler: DeleteExpressionCommandHandler;

  beforeEach(() => {
    termRepository = new TermRepositoryMock();

    handler = new DeleteExpressionCommandHandler(termRepository);
  });

  const prepareDependencies = () => {
    termRepository = new TermRepositoryMock();
  };

  const initHandler = () => {
    handler = new DeleteExpressionCommandHandler(termRepository);
  };

  const clean = () => {
    termRepository.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When the term id is invalid ', () => {
    let command: DeleteExpressionCommand;

    function startScenario() {
      command = DeleteExpressionCommandMother.random('invalid');
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(InvalidArgumentException);
    });

    it('then should not delete', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(termRepository.deletedChanged()).toBeFalsy();
      expect(termRepository.deleted()).toHaveLength(0);
    });
  });

  describe('When the term does not exists ', () => {
    let command: DeleteExpressionCommand;

    function startScenario() {
      const expression = ExpressionMother.random();
      command = DeleteExpressionCommandMother.random(expression.id.value);
    }

    beforeEach(startScenario);

    it('then should not delete', async () => {
      await handler.execute(command);

      expect(termRepository.deletedChanged()).toBeFalsy();
      expect(termRepository.deleted()).toHaveLength(0);
    });
  });

  describe('When the expression exists ', () => {
    let command: DeleteExpressionCommand;
    let expression: Expression;

    function startScenario() {
      expression = ExpressionMother.random();
      command = DeleteExpressionCommandMother.random(expression.id.value);

      termRepository.add(expression);
    }

    beforeEach(startScenario);

    it('then should delete the expression', async () => {
      await handler.execute(command);

      const termDeleted = termRepository.deleted();
      expect(termRepository.deletedChanged()).toBeTruthy();
      expect(termDeleted).toHaveLength(1);
      expect(termDeleted[0].toPrimitives()).toEqual(expression.toPrimitives());
    });
  });
});
