import { beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import DeleteTermCommandHandler from '@src/languages/application/term/command/deleteTermCommandHandler';
import { TermRepositoryMock } from '@test/unit/languages/domain/term/termRepositoryMock';
import ExpressionMother from '@test/unit/languages/domain/term/expression/expressionMother';
import InvalidArgumentException from '@src/shared/domain/exceptions/invalidArgumentException';
import Expression from '@src/languages/domain/term/expression/expression';
import { EventBusMock } from '@test/unit/shared/domain/buses/eventBus/eventBusMock';
import { DeleteTermCommandMother } from './deleteTermCommandMother';
import DeleteTermCommand from '@src/languages/application/term/command/deleteTermCommand';
import TermDoesNotExistsException from '@src/languages/domain/term/termDoesNotExistsException';
import { TermDeletedEventMother } from '@test/unit/languages/domain/term/termDeletedEventMother';

describe('Given a DeleteTermCommandHandler to handle', () => {
  let termRepository: TermRepositoryMock;
  let eventBus: EventBusMock;
  let handler: DeleteTermCommandHandler;

  const prepareDependencies = () => {
    termRepository = new TermRepositoryMock();
    eventBus = new EventBusMock();
  };

  const initHandler = () => {
    handler = new DeleteTermCommandHandler(termRepository, eventBus);
  };

  const clean = () => {
    termRepository.clean();
    eventBus.clean();
  };

  beforeAll(() => {
    prepareDependencies();
    initHandler();
  });

  beforeEach(() => {
    clean();
  });

  describe('When the term id is invalid ', () => {
    let command: DeleteTermCommand;

    function startScenario() {
      command = DeleteTermCommandMother.random('invalid');
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

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the term does not exists ', () => {
    let command: DeleteTermCommand;

    function startScenario() {
      const expression = ExpressionMother.random();
      command = DeleteTermCommandMother.random(expression.id.value);
    }

    beforeEach(startScenario);

    it('then should thrown an exception', async () => {
      await expect(handler.execute(command)).rejects.toThrowError(TermDoesNotExistsException);

      expect(termRepository.deletedChanged()).toBeFalsy();
      expect(termRepository.deleted()).toHaveLength(0);
    });

    it('then should not publish the events', async () => {
      await expect(handler.execute(command)).rejects.toThrowError();

      expect(eventBus.domainEvents()).toHaveLength(0);
    });
  });

  describe('When the term exists ', () => {
    let command: DeleteTermCommand;
    let expression: Expression;

    function startScenario() {
      expression = ExpressionMother.random();
      command = DeleteTermCommandMother.random(expression.id.value);

      termRepository.add(expression);
    }

    beforeEach(startScenario);

    it('then should delete the term', async () => {
      await handler.execute(command);

      const termDeleted = termRepository.deleted();
      expect(termRepository.deletedChanged()).toBeTruthy();
      expect(termDeleted).toHaveLength(1);
      expect(termDeleted[0].toPrimitives()).toEqual(expression.toPrimitives());
    });

    it('then should publish the events', async () => {
      await handler.execute(command);

      expect(eventBus.domainEvents()).toHaveLength(1);
      expect(eventBus.domainEvents()[0]).toEqual({
        ...TermDeletedEventMother.random({ termId: expression.id.toString(), termType: expression.type.toString() }),
      });
    });
  });
});
